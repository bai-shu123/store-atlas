const FLOORS = {
  '1F': { label: '一楼', zones: ['A', 'B', 'C', 'D', 'E'] },
  '2F': { label: '二楼', zones: ['F', 'G', 'H1', 'H2', 'J1', 'J2', 'K1', 'K2', 'L1', 'L2', 'M1', 'M2'] },
  '3F': { label: '三楼', zones: ['W1', 'W2', 'X1', 'X2', 'Y1', 'Y2', 'Z1', 'Z2'] }
};

const ZONE_COPY = {
  A: ['入口陈列区', '顾客进入店面后的第一视觉触点，适合放置当季主推或高识别度货品。'],
  B: ['新品体验区', '适合需要被触摸、试用或近距离观察的新品与体验型货品。'],
  C: ['主通道展示区', '流动客流经过的位置，建议陈列高频关注、容易被带走的货品。'],
  D: ['组合陈列区', '用来放置可以互相搭配的货品，让顾客更容易发现成套购买的选择。'],
  E: ['收银邻近区', '适合小件、补充型或结账前容易顺手带走的货品。']
};

const STORAGE_KEY = 'store-atlas-products-v1';
const STORE_ATLAS_CONFIG = window.STORE_ATLAS_CONFIG || {};
let remoteClient = null;
const seedProducts = [
  { id: 'seed-1', number: 'SKU-2408-01', type: '季节主推', floor: '1F', zone: 'A', details: '入口第一视线，保持正面朝向；每周一检查库存。', image: '', updatedAt: '2026-10-06T09:20:00' },
  { id: 'seed-2', number: 'SKU-2408-07', type: '护肤品', floor: '1F', zone: 'A', details: '白色礼盒装，和同系列试用装放在一起。', image: '', updatedAt: '2026-10-05T14:10:00' },
  { id: 'seed-3', number: 'SKU-2410-12', type: '新品', floor: '1F', zone: 'B', details: '需要预留试用空间，附带说明卡。', image: '', updatedAt: '2026-10-04T11:45:00' },
  { id: 'seed-4', number: 'SKU-2309-18', type: '日常补货', floor: '1F', zone: 'C', details: '按颜色从浅到深排列，断货时及时从后仓补齐。', image: '', updatedAt: '2026-10-03T16:35:00' },
  { id: 'seed-5', number: 'SKU-2407-23', type: '套装', floor: '2F', zone: 'H1', details: '与 H2 的配件货品形成组合陈列。', image: '', updatedAt: '2026-10-02T10:05:00' },
  { id: 'seed-6', number: 'SKU-2312-09', type: '经典款', floor: '3F', zone: 'X2', details: '按尺码从左至右排列，保留一件展示样品。', image: '', updatedAt: '2026-09-29T13:50:00' }
];

const state = {
  floor: '1F',
  zone: 'A',
  products: loadProducts(),
  editingId: null,
  query: '',
  remoteEnabled: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : seedProducts;
  } catch (error) {
    return seedProducts;
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
}

function setSyncStatus(message, tone = 'ok') {
  const label = document.querySelector('.sync-status span:last-child');
  const dot = document.querySelector('.status-dot');
  if (label) label.textContent = message;
  if (dot) {
    dot.style.background = tone === 'error' ? '#e9785c' : tone === 'busy' ? '#f4c95d' : '#4cae79';
    dot.style.boxShadow = tone === 'error' ? '0 0 0 4px rgba(233,120,92,.14)' : tone === 'busy' ? '0 0 0 4px rgba(244,201,93,.18)' : '0 0 0 4px rgba(76,174,121,.14)';
  }
}

function remoteConfigured() {
  return Boolean(STORE_ATLAS_CONFIG.url && STORE_ATLAS_CONFIG.anonKey && window.supabase?.createClient);
}

function fromRemoteProduct(row) {
  return {
    id: row.id,
    number: row.number,
    type: row.type,
    floor: row.floor,
    zone: row.zone,
    details: row.details || '',
    image: row.image || '',
    updatedAt: row.updated_at || new Date().toISOString()
  };
}

function toRemoteProduct(product) {
  return {
    id: product.id,
    number: product.number,
    type: product.type,
    floor: product.floor,
    zone: product.zone,
    details: product.details || '',
    image: product.image || '',
    updated_at: product.updatedAt || new Date().toISOString()
  };
}

async function initRemote() {
  if (!remoteConfigured()) {
    setSyncStatus('本地模式');
    return;
  }
  remoteClient = window.supabase.createClient(STORE_ATLAS_CONFIG.url, STORE_ATLAS_CONFIG.anonKey);
  state.remoteEnabled = true;
  setSyncStatus('正在连接云端…', 'busy');
  const { data, error } = await remoteClient.from('products').select('*').order('updated_at', { ascending: false });
  if (error) {
    console.error('Supabase load failed', error);
    setSyncStatus('云端连接失败', 'error');
    showToast('云端连接失败，暂时使用本机数据');
    return;
  }
  if (data.length) {
    state.products = data.map(fromRemoteProduct);
  } else {
    const { error: seedError } = await remoteClient.from('products').upsert(seedProducts.map(toRemoteProduct));
    if (!seedError) state.products = seedProducts;
  }
  saveProducts();
  setSyncStatus('云端已同步');
  renderAll();
}

async function uploadRemoteImage(product) {
  if (!remoteClient || !product.image || !product.image.startsWith('data:')) return product;
  const response = await fetch(product.image);
  const blob = await response.blob();
  const extension = (blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
  const path = `${product.id}-${Date.now()}.${extension}`;
  const { error: uploadError } = await remoteClient.storage.from('product-images').upload(path, blob, { upsert: true, contentType: blob.type });
  if (uploadError) throw uploadError;
  const { data } = remoteClient.storage.from('product-images').getPublicUrl(path);
  return { ...product, image: data.publicUrl };
}

async function upsertRemoteProduct(product) {
  if (!remoteClient) return product;
  const remoteProduct = await uploadRemoteImage(product);
  const { error } = await remoteClient.from('products').upsert(toRemoteProduct(remoteProduct));
  if (error) throw error;
  return remoteProduct;
}

async function removeRemoteProduct(id) {
  if (!remoteClient) return;
  const { error } = await remoteClient.from('products').delete().eq('id', id);
  if (error) throw error;
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function formatDate(value) {
  if (!value) return '刚刚更新';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '刚刚更新';
  return `${date.getMonth() + 1}/${date.getDate()} 更新`;
}

function floorProducts(floor = state.floor) {
  return state.products.filter((product) => product.floor === floor);
}

function zoneProducts(floor = state.floor, zone = state.zone) {
  return state.products.filter((product) => product.floor === floor && product.zone === zone);
}

function productCountForZone(floor, zone) {
  return state.products.filter((product) => product.floor === floor && product.zone === zone).length;
}

function renderAll() {
  renderNavigation();
  renderMobileFloorBar();
  renderHeaderStats();
  renderArea();
  renderInspector();
  renderSearchResults();
}

function renderNavigation() {
  const nav = $('#floorNav');
  nav.innerHTML = Object.entries(FLOORS).map(([floor, data], floorIndex) => {
    const total = floorProducts(floor).length;
    const zones = data.zones.map((zone) => `<button class="zone-button ${state.floor === floor && state.zone === zone ? 'active' : ''} ${productCountForZone(floor, zone) ? 'occupied' : ''}" data-zone="${zone}" data-floor="${floor}" aria-label="${data.label} ${zone} 区，${productCountForZone(floor, zone)} 件货品">${zone}</button>`).join('');
    return `<div class="floor-group"><button class="floor-button ${state.floor === floor ? 'active' : ''}" data-floor-only="${floor}"><span class="floor-label"><span class="floor-number">0${floorIndex + 1}</span>${data.label}</span><span class="floor-total">${total} 件</span></button><div class="zone-list">${zones}</div></div>`;
  }).join('');
  $('#zoneCount').textContent = `${Object.values(FLOORS).reduce((sum, floor) => sum + floor.zones.length, 0)} 区`;
  $$('.floor-button').forEach((button) => button.addEventListener('click', () => selectFloor(button.dataset.floorOnly)));
  $$('.zone-button').forEach((button) => button.addEventListener('click', () => selectZone(button.dataset.floor, button.dataset.zone)));
}

function renderMobileFloorBar() {
  $('#mobileFloorBar').innerHTML = Object.entries(FLOORS).map(([floor, data]) => `<button class="mobile-floor-button ${state.floor === floor ? 'active' : ''}" data-mobile-floor="${floor}">${data.label} <span>${floorProducts(floor).length}</span></button>`).join('');
  $$('.mobile-floor-button').forEach((button) => button.addEventListener('click', () => selectFloor(button.dataset.mobileFloor)));
}

function renderHeaderStats() {
  const data = FLOORS[state.floor];
  const products = floorProducts();
  const occupied = data.zones.filter((zone) => productCountForZone(state.floor, zone) > 0).length;
  const latest = [...products].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
  $('#activeFloorLabel').textContent = data.label;
  $('#floorProductCount').textContent = products.length;
  $('#floorProductHint').textContent = products.length === 1 ? '件待整理' : '件已登记';
  $('#occupancyRate').textContent = `${Math.round((occupied / data.zones.length) * 100)}%`;
  $('#occupancyHint').textContent = `${occupied} / ${data.zones.length} 个区域`;
  $('#lastUpdated').textContent = latest ? formatDate(latest.updatedAt) : '—';
}

function renderArea() {
  const data = FLOORS[state.floor];
  const copy = ZONE_COPY[state.zone] || [`${state.zone} 区`, '这个区域还没有备注，可以在货品细节中补充陈列要求。'];
  $('#currentAreaName').textContent = `${state.zone} 区`;
  $('#currentAreaMeta').textContent = `${data.label} · ${copy[0]}`;
  $('#zoneMap').innerHTML = data.zones.map((zone) => `<button class="map-zone ${state.zone === zone ? 'active' : ''} ${productCountForZone(state.floor, zone) ? 'occupied' : ''}" data-map-zone="${zone}">${zone}<span class="sr-only"> ${productCountForZone(state.floor, zone)} 件货品</span></button>`).join('');
  $$('.map-zone').forEach((button) => button.addEventListener('click', () => selectZone(state.floor, button.dataset.mapZone)));

  const products = zoneProducts();
  $('#productGrid').innerHTML = products.map(productCard).join('');
  $('#emptyState').hidden = products.length > 0;
  $$('.edit-product').forEach((button) => button.addEventListener('click', () => openEdit(button.dataset.id)));
  $$('.delete-product').forEach((button) => button.addEventListener('click', () => deleteProduct(button.dataset.id)));
}

function productCard(product) {
  const image = product.image ? `<img src="${product.image}" alt="${escapeHTML(product.number)} 图片" />` : `<span class="placeholder-mark">${escapeHTML(product.zone)}</span>`;
  return `<article class="product-card"><div class="product-image ${product.image ? '' : 'placeholder'}">${image}</div><div class="product-info"><span class="product-location">${escapeHTML(product.floor)} / ${escapeHTML(product.zone)}</span><h3 class="product-number" title="${escapeHTML(product.number)}">${escapeHTML(product.number)}</h3><p class="product-type">${escapeHTML(product.type)}</p><p class="product-details">${escapeHTML(product.details || '暂无细节说明')}</p><div class="product-card-footer"><span class="product-date">${formatDate(product.updatedAt)}</span><div class="card-actions"><button class="card-action edit-product" data-id="${product.id}" aria-label="编辑 ${escapeHTML(product.number)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16-.7 4.7L8 20l11.3-11.3a2.1 2.1 0 0 0-3-3L5 17Z"></path><path d="m14.8 7.2 2 2"></path></svg></button><button class="card-action delete delete-product" data-id="${product.id}" aria-label="删除 ${escapeHTML(product.number)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"></path></svg></button></div></div></div></article>`;
}

function renderInspector() {
  const data = FLOORS[state.floor];
  const copy = ZONE_COPY[state.zone] || [`${state.zone} 区`, '这个区域还没有备注，可以在货品细节中补充陈列要求。'];
  const products = zoneProducts();
  const imageCount = products.filter((product) => product.image).length;
  $('#inspectorZone').textContent = state.zone;
  $('#inspectorTitle').textContent = copy[0];
  $('#inspectorCopy').textContent = copy[1];
  $('#inspectorFloor').textContent = data.label;
  $('#inspectorProducts').textContent = `${products.length} 件`;
  $('#inspectorImages').textContent = `${products.length ? Math.round((imageCount / products.length) * 100) : 0}%`;
  $('#miniMapLabel').textContent = state.floor;
  $('#miniMap').innerHTML = data.zones.map((zone) => `<button class="mini-map-zone ${productCountForZone(state.floor, zone) ? 'occupied' : ''} ${state.zone === zone ? 'active' : ''}" data-mini-zone="${zone}" aria-label="${zone} 区">${zone}</button>`).join('');
  $$('.mini-map-zone').forEach((button) => button.addEventListener('click', () => selectZone(state.floor, button.dataset.miniZone)));
}

function selectFloor(floor) {
  if (!FLOORS[floor]) return;
  state.floor = floor;
  state.zone = FLOORS[floor].zones[0];
  renderAll();
}

function selectZone(floor, zone) {
  if (!FLOORS[floor] || !FLOORS[floor].zones.includes(zone)) return;
  state.floor = floor;
  state.zone = zone;
  state.query = '';
  $('#globalSearch').value = '';
  $('#clearSearch').hidden = true;
  renderAll();
}

function openAdd() {
  state.editingId = null;
  $('#dialogEyebrow').textContent = 'ADD PRODUCT';
  $('#dialogTitle').textContent = '添加货品';
  $('#saveProductText').textContent = '保存货品';
  $('#productForm').reset();
  fillFloorOptions(state.floor, state.zone);
  setImagePreview('');
  updateDetailCount();
  $('#productDialog').showModal();
  setTimeout(() => $('#productNumber').focus(), 30);
}

function openEdit(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  state.editingId = id;
  $('#dialogEyebrow').textContent = 'EDIT PRODUCT';
  $('#dialogTitle').textContent = '编辑货品';
  $('#saveProductText').textContent = '保存修改';
  $('#productNumber').value = product.number;
  $('#productType').value = product.type;
  $('#productDetails').value = product.details || '';
  fillFloorOptions(product.floor, product.zone);
  setImagePreview(product.image || '');
  updateDetailCount();
  $('#productDialog').showModal();
  setTimeout(() => $('#productNumber').focus(), 30);
}

function fillFloorOptions(selectedFloor, selectedZone) {
  $('#productFloor').innerHTML = Object.entries(FLOORS).map(([floor, data]) => `<option value="${floor}" ${floor === selectedFloor ? 'selected' : ''}>${data.label}（${floor}）</option>`).join('');
  const renderZones = () => {
    const floor = $('#productFloor').value;
    $('#productZone').innerHTML = FLOORS[floor].zones.map((zone) => `<option value="${zone}" ${zone === selectedZone && floor === selectedFloor ? 'selected' : ''}>${zone} 区</option>`).join('');
  };
  renderZones();
  $('#productFloor').onchange = renderZones;
}

function setImagePreview(src) {
  $('#imagePreview').innerHTML = src ? `<img src="${src}" alt="货品预览" />` : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"></path><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m4 17 4.5-4.5 3 3 2-2L20 19"></path></svg><span>暂无图片</span>`;
  $('#removeImage').hidden = !src;
  $('#productImage').dataset.value = src || '';
}

async function deleteProduct(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  if (!window.confirm(`确定删除货品「${product.number}」吗？删除后无法恢复。`)) return;
  state.products = state.products.filter((item) => item.id !== id);
  saveProducts();
  renderAll();
  showToast(state.remoteEnabled ? '货品已删除，正在同步云端…' : '货品已删除');
  if (state.remoteEnabled) {
    try {
      await removeRemoteProduct(id);
      setSyncStatus('云端已同步');
      showToast('货品已从共享数据中删除');
    } catch (error) {
      console.error('Supabase delete failed', error);
      setSyncStatus('同步失败', 'error');
      showToast('云端删除失败，本机已删除');
    }
  }
}

function renderSearchResults() {
  const query = state.query.trim().toLowerCase();
  const panel = $('#searchResults');
  if (!query) { panel.hidden = true; return; }
  const results = state.products.filter((product) => [product.number, product.type, product.details, product.zone, product.floor, FLOORS[product.floor]?.label].join(' ').toLowerCase().includes(query)).slice(0, 8);
  panel.innerHTML = results.length ? results.map((product) => `<button class="search-result" data-search-id="${product.id}"><span class="search-result-thumb">${product.image ? `<img src="${product.image}" alt="" />` : escapeHTML(product.zone)}</span><span class="search-result-main"><strong>${escapeHTML(product.number)}</strong><span>${escapeHTML(product.type)} · ${escapeHTML(FLOORS[product.floor]?.label || product.floor)} ${escapeHTML(product.zone)} 区</span></span></button>`).join('') : '<div class="search-empty">没有找到匹配的货品或区域</div>';
  panel.hidden = false;
  $$('.search-result').forEach((button) => button.addEventListener('click', () => {
    const product = state.products.find((item) => item.id === button.dataset.searchId);
    if (product) selectZone(product.floor, product.zone);
  }));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function updateDetailCount() {
  $('#detailCount').textContent = $('#productDetails').value.length;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state.products, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `店面货品摆放-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast('货品数据已导出');
}

$('#quickAdd').addEventListener('click', openAdd);
$('#areaAdd').addEventListener('click', openAdd);
$('#emptyAdd').addEventListener('click', openAdd);
$('#exportData').addEventListener('click', exportData);
$('#closeDialog').addEventListener('click', () => $('#productDialog').close());
$('#cancelDialog').addEventListener('click', () => $('#productDialog').close());
$('#productDialog').addEventListener('click', (event) => { if (event.target === $('#productDialog')) $('#productDialog').close(); });
$('#productDetails').addEventListener('input', updateDetailCount);
$('#globalSearch').addEventListener('input', (event) => { state.query = event.target.value; $('#clearSearch').hidden = !state.query; renderSearchResults(); });
$('#clearSearch').addEventListener('click', () => { state.query = ''; $('#globalSearch').value = ''; $('#clearSearch').hidden = true; renderSearchResults(); $('#globalSearch').focus(); });
$('#productImage').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) { showToast('图片不能超过 4MB'); event.target.value = ''; return; }
  const reader = new FileReader();
  reader.onload = () => setImagePreview(reader.result);
  reader.readAsDataURL(file);
});
$('#removeImage').addEventListener('click', () => { setImagePreview(''); $('#productImage').value = ''; });
$('#productForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const product = { number: $('#productNumber').value.trim(), type: $('#productType').value.trim(), floor: $('#productFloor').value, zone: $('#productZone').value, details: $('#productDetails').value.trim(), image: $('#productImage').dataset.value || '', updatedAt: new Date().toISOString() };
  if (!product.number || !product.type) return;
  const savedProduct = state.editingId
    ? { ...state.products.find((item) => item.id === state.editingId), ...product }
    : { ...product, id: `product-${Date.now()}` };
  if (state.editingId) {
    state.products = state.products.map((item) => item.id === state.editingId ? savedProduct : item);
  } else {
    state.products.unshift(savedProduct);
  }
  saveProducts();
  state.floor = product.floor;
  state.zone = product.zone;
  $('#productDialog').close();
  renderAll();
  showToast(state.remoteEnabled ? '已保存，正在同步云端…' : (state.editingId ? '货品信息已更新' : '货品已添加到区域'));
  if (state.remoteEnabled) {
    try {
      setSyncStatus('正在同步…', 'busy');
      const syncedProduct = await upsertRemoteProduct(savedProduct);
      state.products = state.products.map((item) => item.id === syncedProduct.id ? syncedProduct : item);
      saveProducts();
      setSyncStatus('云端已同步');
      renderAll();
      showToast(state.editingId ? '货品信息已同步' : '货品已添加到共享数据');
    } catch (error) {
      console.error('Supabase save failed', error);
      setSyncStatus('同步失败', 'error');
      showToast('云端同步失败，数据已保存在本机');
    }
  }
});

renderAll();
initRemote();
