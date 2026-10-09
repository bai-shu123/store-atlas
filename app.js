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

const LOCATION_RULES = {
  zh: {
    eyebrow: 'LOCATION RULES', title: '位置规则', button: '位置规则', open: '查看位置规则', close: '关闭',
    intro: '按颜色、楼层、货架排数和楼梯口前后快速定位。',
    floors: [
      { title: '一楼', rows: [['A', '红色区域'], ['B', '黄色区域'], ['C', '绿色区域'], ['D', '蓝色区域'], ['E', '紫色区域']] },
      { title: '二楼', rows: [['F', '楼梯边货架'], ['G', '二楼地板上的区域'], ['H1', '二楼左边小阁楼内左侧的货架'], ['H2', '同一小阁楼内右侧的货架'], ['J1', '最左排，从起点到三楼楼梯'], ['J2', '最左排后段，从三楼楼梯到最后端'], ['K1', '第二排，从起点到三楼楼梯'], ['K2', '第二排后段，从三楼楼梯到最后端'], ['L1 / L2', '第三排货架的前段 / 后段'], ['M1 / M2', '第四排货架的前段 / 后段']] },
      { title: '三楼', rows: [['W1 / W2', 'W 排货架的前段 / 后段'], ['X1 / X2', 'X 排货架的前段 / 后段'], ['Y1 / Y2', 'Y 排货架的前段 / 后段'], ['Z1 / Z2', 'Z 排货架的前段 / 后段']] }
    ],
    note: '编号以 1 结尾的区域位于三楼楼梯口前面；以 2 结尾的区域位于三楼楼梯口后面。'
  },
  kk: {
    eyebrow: 'ОРНАЛАСУ ЕРЕЖЕЛЕРІ', title: 'Орналасу ережелері', button: 'Ережелер', open: 'Орналасу ережелерін көру', close: 'Жабу',
    intro: 'Тауар орнын түсі, қабаты, сөре қатары және баспалдаққа қатысты орны бойынша табыңыз.',
    floors: [
      { title: '1-қабат', rows: [['A', 'Қызыл аймақ'], ['B', 'Сары аймақ'], ['C', 'Жасыл аймақ'], ['D', 'Көк аймақ'], ['E', 'Күлгін аймақ']] },
      { title: '2-қабат', rows: [['F', 'Баспалдақ жанындағы сөре'], ['G', 'Едендегі аймақ'], ['H1', '2-қабаттың сол жағындағы шағын аралық қабат ішіндегі сол жақ сөре'], ['H2', 'Сол аралық қабат ішіндегі оң жақ сөре'], ['J1', 'Ең сол жақ қатар, басталған жерден 3-қабат баспалдағына дейін'], ['J2', 'Ең сол жақ қатардың артқы бөлігі, 3-қабат баспалдағы тұсынан соңғы шетке дейін'], ['K1', 'Екінші қатар, басталған жерден 3-қабат баспалдағына дейін'], ['K2', 'Екінші қатардың артқы бөлігі, 3-қабат баспалдағы тұсынан соңғы шетке дейін'], ['L1 / L2', 'Үшінші қатардың алдыңғы / артқы бөлігі'], ['M1 / M2', 'Төртінші қатардың алдыңғы / артқы бөлігі']] },
      { title: '3-қабат', rows: [['W1 / W2', 'W қатарының алдыңғы / артқы бөлігі'], ['X1 / X2', 'X қатарының алдыңғы / артқы бөлігі'], ['Y1 / Y2', 'Y қатарының алдыңғы / артқы бөлігі'], ['Z1 / Z2', 'Z қатарының алдыңғы / артқы бөлігі']] }
    ],
    note: '1-мен аяқталатын аймақтар 3-қабат баспалдағының алдында, 2-мен аяқталатын аймақтар баспалдақтан кейін орналасады.'
  },
  ru: {
    eyebrow: 'ПРАВИЛА РАЗМЕЩЕНИЯ', title: 'Правила размещения', button: 'Правила', open: 'Открыть правила размещения', close: 'Закрыть',
    intro: 'Находите товар по цвету, этажу, ряду стеллажей и стороне относительно лестницы.',
    floors: [
      { title: '1 этаж', rows: [['A', 'Красная зона'], ['B', 'Жёлтая зона'], ['C', 'Зелёная зона'], ['D', 'Синяя зона'], ['E', 'Фиолетовая зона']] },
      { title: '2 этаж', rows: [['F', 'Стеллаж у лестницы'], ['G', 'Зона на полу второго этажа'], ['H1', 'Левый стеллаж внутри небольшой антресоли в левой части второго этажа'], ['H2', 'Правый стеллаж внутри той же антресоли'], ['J1', 'Крайний левый ряд, от начала до лестницы на 3 этаж'], ['J2', 'Задняя часть крайнего левого ряда, от лестницы на 3 этаж до дальнего края'], ['K1', 'Второй ряд, от начала до лестницы на 3 этаж'], ['K2', 'Задняя часть второго ряда, от лестницы на 3 этаж до дальнего края'], ['L1 / L2', 'Передняя / задняя часть третьего ряда'], ['M1 / M2', 'Передняя / задняя часть четвёртого ряда']] },
      { title: '3 этаж', rows: [['W1 / W2', 'Передняя / задняя часть ряда W'], ['X1 / X2', 'Передняя / задняя часть ряда X'], ['Y1 / Y2', 'Передняя / задняя часть ряда Y'], ['Z1 / Z2', 'Передняя / задняя часть ряда Z']] }
    ],
    note: 'Зоны с окончанием 1 находятся перед лестницей на 3 этаж, а зоны с окончанием 2 — за лестницей.'
  }
};

const STORAGE_KEY = 'store-atlas-products-v1';
const LANGUAGE_KEY = 'store-atlas-language';
const TRANSLATIONS = {
  zh: {
    title: '店面货品摆放 · 区域台账', brand: '店面货品摆放', navigate: 'NAVIGATE', areas: '摆放区域', storeMap: 'STORE MAP',
    intro: '按楼层和区域整理陈列信息，现场查找时一眼就能定位。', heroMapLine1: '现场区域', heroMapLine2: '快速定位',
    floorProducts: '当前楼层货品', refreshData: '刷新云端数据', refreshingData: '正在刷新云端数据…', refreshed: '云端数据已刷新', refreshFailed: '刷新失败，请检查云端连接',
    currentZone: 'CURRENT ZONE', export: '导出', addToZone: '添加到本区', emptyTitle: '这个区域还没有货品', emptyCopy: '把第一件货品放进这里，建立你的店面地图。', emptyAdd: '添加第一件货品',
    zoneNote: 'ZONE NOTE', floorLayout: '楼层布局', tip: '小提示：上传实拍图后，现场同事能更快确认货品与位置。', productImage: '货品图片', imageHint: '建议上传清晰的正面或货架实拍图', chooseImage: '选择图片', removeImage: '移除图片',
    productNumber: '货品编号 <i>*</i>', productType: '货品类型 <i>*</i>', productPrice: '货品价格（选填）', productFloor: '所在楼层 <i>*</i>', productZone: '所在区域 <i>*</i>', stockStatus: '货品数量状态', stockAmple: '充裕', stockNormal: '一般', stockRestock: '需要补货', pricePrefix: '价格', details: '细节说明', cancel: '取消',
    addProduct: '添加货品', editProduct: '编辑货品', saveProduct: '保存货品', saveChanges: '保存修改', searchPlaceholder: '搜索货品编号、类型或区域…',
    localSaved: '本地已保存', localMode: '本地模式', cloudSynced: '云端已同步', syncing: '正在同步…', connecting: '正在连接云端…', connectionFail: '云端连接失败',
    pieces: '件', registered: '件已登记', toOrganize: '件待整理', zones: '个区域', noImage: '暂无图片', noDetails: '暂无细节说明', justUpdated: '刚刚更新', updated: '更新',
    noResults: '没有找到匹配的货品或区域', imageTooLarge: '图片不能超过 4MB', delete: '删除', deleted: '货品已删除', deleteShared: '货品已从共享数据中删除', deleteFailed: '云端删除失败，本机已删除',
    savedSyncing: '已保存，正在同步云端…', added: '货品已添加到区域', updatedProduct: '货品信息已更新', syncedAdded: '货品已添加到共享数据', syncedUpdated: '货品信息已同步', syncFailed: '云端同步失败，数据已保存在本机',
    confirmDelete: '确定删除货品「{{number}}」吗？删除后无法恢复。', floor1: '一楼', floor2: '二楼', floor3: '三楼', floorShort1: '1F', floorShort2: '2F', floorShort3: '3F',
    entrance: '入口陈列区', experience: '新品体验区', mainPath: '主通道展示区', bundle: '组合陈列区', checkout: '收银邻近区',
    entranceCopy: '顾客进入店面后的第一视觉触点，适合放置当季主推或高识别度货品。', experienceCopy: '适合需要被触摸、试用或近距离观察的新品与体验型货品。', mainPathCopy: '流动客流经过的位置，建议陈列高频关注、容易被带走的货品。', bundleCopy: '用来放置可以互相搭配的货品，让顾客更容易发现成套购买的选择。', checkoutCopy: '适合小件、补充型或结账前容易顺手带走的货品。'
  },
  kk: {
    title: 'Дүкен тауарлары · Аймақтар тізімі', brand: 'Дүкен тауарлары', navigate: 'БАҒЫТ', areas: 'Орналастыру аймақтары', storeMap: 'ДҮКЕН КАРТАСЫ',
    intro: 'Тауарларды қабаттар мен аймақтар бойынша реттеңіз — қажетті орынды бірден табыңыз.', heroMapLine1: 'Дүкен аймағы', heroMapLine2: 'Жылдам табу',
    floorProducts: 'Осы қабаттағы тауар', refreshData: 'Бұлттағы деректерді жаңарту', refreshingData: 'Бұлттағы деректер жаңартылуда…', refreshed: 'Бұлттағы деректер жаңартылды', refreshFailed: 'Жаңарту сәтсіз, бұлт байланысын тексеріңіз',
    currentZone: 'ҚАЗІРГІ АЙМАҚ', export: 'Экспорт', addToZone: 'Осы аймаққа қосу', emptyTitle: 'Бұл аймақта тауар жоқ', emptyCopy: 'Дүкен картаңызды құру үшін алғашқы тауарды қосыңыз.', emptyAdd: 'Алғашқы тауарды қосу',
    zoneNote: 'АЙМАҚ ЕСКЕРТПЕСІ', floorLayout: 'Қабат жоспары', tip: 'Кеңес: нақты сурет қосылса, қызметкерлер тауар орнын тезірек табады.', productImage: 'Тауар суреті', imageHint: 'Алдыңғы немесе сөре суретін анық етіп жүктеңіз', chooseImage: 'Сурет таңдау', removeImage: 'Суретті өшіру',
    productNumber: 'Тауар нөмірі <i>*</i>', productType: 'Тауар түрі <i>*</i>', productPrice: 'Тауар бағасы (міндетті емес)', productFloor: 'Қабат <i>*</i>', productZone: 'Аймақ <i>*</i>', stockStatus: 'Тауар санының күйі', stockAmple: 'Жеткілікті', stockNormal: 'Қалыпты', stockRestock: 'Толықтыру қажет', pricePrefix: 'Бағасы', details: 'Толық сипаттама', cancel: 'Бас тарту',
    addProduct: 'Тауар қосу', editProduct: 'Тауарды өңдеу', saveProduct: 'Тауарды сақтау', saveChanges: 'Өзгерістерді сақтау', searchPlaceholder: 'Нөмір, түр немесе аймақ бойынша іздеу…',
    localSaved: 'Жергілікті сақталды', localMode: 'Жергілікті режим', cloudSynced: 'Бұлтпен синхрондалды', syncing: 'Синхрондалуда…', connecting: 'Бұлтқа қосылуда…', connectionFail: 'Бұлтқа қосылу сәтсіз',
    pieces: 'дана', registered: 'дана тіркелді', toOrganize: 'дана реттелуде', zones: 'аймақ', noImage: 'Сурет жоқ', noDetails: 'Сипаттама жоқ', justUpdated: 'Жаңа ғана жаңартылды', updated: 'жаңартылды',
    noResults: 'Сәйкес тауар немесе аймақ табылмады', imageTooLarge: 'Сурет 4 МБ-тан аспауы керек', delete: 'Өшіру', deleted: 'Тауар өшірілді', deleteShared: 'Тауар ортақ деректерден өшірілді', deleteFailed: 'Бұлттан өшіру сәтсіз, жергілікті дерек өшірілді',
    savedSyncing: 'Сақталды, бұлтпен синхрондалуда…', added: 'Тауар аймаққа қосылды', updatedProduct: 'Тауар жаңартылды', syncedAdded: 'Тауар ортақ дерекке қосылды', syncedUpdated: 'Тауар бұлтта жаңартылды', syncFailed: 'Бұлтпен синхрондау сәтсіз, дерек жергілікті сақталды',
    confirmDelete: '«{{number}}» тауарын өшіру керек пе? Бұл әрекетті қайтару мүмкін емес.', floor1: '1-қабат', floor2: '2-қабат', floor3: '3-қабат', floorShort1: '1F', floorShort2: '2F', floorShort3: '3F',
    entrance: 'Кіреберіс витринасы', experience: 'Жаңа тауар аймағы', mainPath: 'Негізгі жол витринасы', bundle: 'Жинақ витринасы', checkout: 'Касса маңы',
    entranceCopy: 'Клиент кіргендегі алғашқы көрініс. Маусымдық және негізгі тауарларға қолайлы.', experienceCopy: 'Ұстап көруді немесе сынауды қажет ететін жаңа тауарларға арналған.', mainPathCopy: 'Көп адам өтетін жол. Жиі таңдалатын тауарларды орналастырыңыз.', bundleCopy: 'Бірге қолданылатын тауарларды қатар көрсетіп, жинақ сатып алуды жеңілдетеді.', checkoutCopy: 'Ұсақ, қосымша немесе касса алдында алынатын тауарларға қолайлы.'
  },
  ru: {
    title: 'Раскладка магазина · Карта зон', brand: 'Раскладка магазина', navigate: 'НАВИГАЦИЯ', areas: 'Зоны размещения', storeMap: 'КАРТА МАГАЗИНА',
    intro: 'Организуйте выкладку по этажам и зонам, чтобы сразу находить нужное место.', heroMapLine1: 'Зона магазина', heroMapLine2: 'Быстрый поиск',
    floorProducts: 'Товары на этаже', refreshData: 'Обновить облачные данные', refreshingData: 'Обновление облачных данных…', refreshed: 'Облачные данные обновлены', refreshFailed: 'Не удалось обновить, проверьте облачное соединение',
    currentZone: 'ТЕКУЩАЯ ЗОНА', export: 'Экспорт', addToZone: 'Добавить в зону', emptyTitle: 'В этой зоне пока нет товаров', emptyCopy: 'Добавьте первый товар и создайте карту магазина.', emptyAdd: 'Добавить первый товар',
    zoneNote: 'ЗАМЕТКА ЗОНЫ', floorLayout: 'План этажа', tip: 'Совет: реальное фото поможет сотрудникам быстрее найти товар и его место.', productImage: 'Фото товара', imageHint: 'Загрузите чёткое фото товара или полки', chooseImage: 'Выбрать фото', removeImage: 'Удалить фото',
    productNumber: 'Артикул <i>*</i>', productType: 'Тип товара <i>*</i>', productPrice: 'Цена товара (необязательно)', productFloor: 'Этаж <i>*</i>', productZone: 'Зона <i>*</i>', stockStatus: 'Состояние количества', stockAmple: 'В наличии', stockNormal: 'Обычно', stockRestock: 'Нужно пополнить', pricePrefix: 'Цена', details: 'Описание', cancel: 'Отмена',
    addProduct: 'Добавить товар', editProduct: 'Изменить товар', saveProduct: 'Сохранить товар', saveChanges: 'Сохранить изменения', searchPlaceholder: 'Поиск по артикулу, типу или зоне…',
    localSaved: 'Сохранено локально', localMode: 'Локальный режим', cloudSynced: 'Синхронизировано', syncing: 'Синхронизация…', connecting: 'Подключение к облаку…', connectionFail: 'Ошибка подключения к облаку',
    pieces: 'шт.', registered: 'шт. зарегистрировано', toOrganize: 'шт. на учёте', zones: 'зон', noImage: 'Нет фото', noDetails: 'Нет описания', justUpdated: 'Только что обновлено', updated: 'обновлено',
    noResults: 'Подходящие товары или зоны не найдены', imageTooLarge: 'Размер фото не должен превышать 4 МБ', delete: 'Удалить', deleted: 'Товар удалён', deleteShared: 'Товар удалён из общих данных', deleteFailed: 'Не удалось удалить из облака, локальная запись удалена',
    savedSyncing: 'Сохранено, синхронизация…', added: 'Товар добавлен в зону', updatedProduct: 'Данные товара обновлены', syncedAdded: 'Товар добавлен в общие данные', syncedUpdated: 'Данные товара синхронизированы', syncFailed: 'Ошибка синхронизации, данные сохранены локально',
    confirmDelete: 'Удалить товар «{{number}}»? Это действие нельзя отменить.', floor1: '1 этаж', floor2: '2 этаж', floor3: '3 этаж', floorShort1: '1F', floorShort2: '2F', floorShort3: '3F',
    entrance: 'Входная витрина', experience: 'Зона новинок', mainPath: 'Витрина главного прохода', bundle: 'Зона комплектов', checkout: 'Зона у кассы',
    entranceCopy: 'Первый визуальный контакт после входа. Подходит для сезонных и ключевых товаров.', experienceCopy: 'Для новинок, которые нужно потрогать, протестировать или рассмотреть.', mainPathCopy: 'Место активного потока покупателей. Размещайте часто выбираемые товары.', bundleCopy: 'Показывает товары, которые хорошо сочетаются, и помогает собрать комплект.', checkoutCopy: 'Подходит для небольших, дополнительных товаров и покупок у кассы.'
  }
};

function t(key, params = {}) {
  const dictionary = TRANSLATIONS[state?.language] || TRANSLATIONS.zh;
  let value = dictionary[key] ?? TRANSLATIONS.zh[key] ?? key;
  Object.entries(params).forEach(([name, replacement]) => { value = value.replaceAll(`{{${name}}}`, replacement); });
  return value;
}

function renderLocationRules() {
  const copy = LOCATION_RULES[state.language] || LOCATION_RULES.zh;
  const content = $('#locationRulesContent');
  if (!content) return;
  content.innerHTML = `<p class="rules-intro">${escapeHTML(copy.intro)}</p>${copy.floors.map((floor) => `<section class="rules-floor"><h3>${escapeHTML(floor.title)}</h3><div class="rules-list">${floor.rows.map(([code, description]) => `<div class="rule-row"><strong>${escapeHTML(code)}</strong><span>${escapeHTML(description)}</span></div>`).join('')}</div></section>`).join('')}<p class="rules-note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.1 7.8 7.5 9.5 4.4-1.7 7.5-4.9 7.5-9.5V6L12 3Z"></path><path d="M12 8v4M12 15h.01"></path></svg><span>${escapeHTML(copy.note)}</span></p>`;
  $('[data-i18n="locationRulesEyebrow"]').textContent = copy.eyebrow;
  $('[data-i18n="locationRulesTitle"]').textContent = copy.title;
  $('#locationRulesDesktop')?.setAttribute('aria-label', copy.open);
  $('#locationRulesDesktop')?.setAttribute('title', copy.open);
  $('#locationRulesDesktop span').textContent = copy.button;
  $('#closeLocationRules')?.setAttribute('aria-label', copy.close);
}

function floorLabel(floor) {
  return t(floor === '1F' ? 'floor1' : floor === '2F' ? 'floor2' : 'floor3');
}

function floorShortLabel(floor) {
  return t(floor === '1F' ? 'floorShort1' : floor === '2F' ? 'floorShort2' : 'floorShort3');
}

function zoneCopy(zone) {
  const map = { A: ['entrance', 'entranceCopy'], B: ['experience', 'experienceCopy'], C: ['mainPath', 'mainPathCopy'], D: ['bundle', 'bundleCopy'], E: ['checkout', 'checkoutCopy'] };
  const keys = map[zone];
  return keys ? [t(keys[0]), t(keys[1])] : [state.language === 'ru' ? `Зона ${zone}` : state.language === 'kk' ? `${zone} аймағы` : `${zone} 区`, state.language === 'ru' ? 'Добавьте описание зоны в деталях товаров.' : state.language === 'kk' ? 'Бұл аймақтың сипаттамасын тауар мәліметтерінде қосыңыз.' : '这个区域还没有备注，可以在货品细节中补充陈列要求。'];
}

function applyLanguage() {
  document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : state.language === 'kk' ? 'kk' : 'ru';
  document.title = t('title');
  $('.brand-name').textContent = t('brand');
  $$('[data-i18n]').forEach((element) => { element.innerHTML = t(element.dataset.i18n); });
  $('#globalSearch').placeholder = t('searchPlaceholder');
  $('#quickAdd span').textContent = t('addProduct');
  $('.sync-status span:last-child').textContent = state.remoteEnabled ? t('cloudSynced') : t('localMode');
  $('#refreshData')?.setAttribute('aria-label', t('refreshData'));
  $('#refreshData')?.setAttribute('title', t('refreshData'));
  renderLocationRules();
  $('#languageSelect').value = state.language;
  $('#dialogTitle').textContent = state.editingId ? t('editProduct') : t('addProduct');
  $('#saveProductText').textContent = state.editingId ? t('saveChanges') : t('saveProduct');
  $('#imagePreview span')?.replaceChildren(document.createTextNode(t('noImage')));
  $('#productDetails').placeholder = state.language === 'zh' ? '记录颜色、规格、陈列要求或补货备注…' : state.language === 'ru' ? 'Цвет, размер, требования к выкладке или заметки…' : 'Түсі, өлшемі, орналастыру талабы немесе толықтыру ескертпесі…';
  $('#productPrice').placeholder = state.language === 'zh' ? '例如：99.00' : state.language === 'ru' ? 'Например: 99.00' : 'Мысалы: 99.00';
  if ($('#productFloor')) fillFloorOptions($('#productFloor').value || state.floor, $('#productZone').value || state.zone);
}
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
  language: localStorage.getItem(LANGUAGE_KEY) || 'zh',
  remoteEnabled: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const products = Array.isArray(stored) ? stored : seedProducts;
    return products.map((product) => ({ ...product, price: product.price === null || product.price === undefined ? '' : String(product.price), stockStatus: ['ample', 'normal', 'restock'].includes(product.stockStatus) ? product.stockStatus : 'ample' }));
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
    price: row.price === null || row.price === undefined || row.price === '' ? '' : String(row.price),
    stockStatus: ['ample', 'normal', 'restock'].includes(row.stock_status) ? row.stock_status : 'ample',
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
    price: product.price === '' || product.price === null || product.price === undefined ? null : Number(product.price),
    stock_status: product.stockStatus || 'ample',
    floor: product.floor,
    zone: product.zone,
    details: product.details || '',
    image: product.image || '',
    updated_at: product.updatedAt || new Date().toISOString()
  };
}

async function refreshRemoteData({ notify = false } = {}) {
  if (!remoteConfigured()) {
    state.remoteEnabled = false;
    setSyncStatus(t('localMode'));
    if (notify) showToast(t('refreshFailed'));
    return false;
  }
  if (!remoteClient) remoteClient = window.supabase.createClient(STORE_ATLAS_CONFIG.url, STORE_ATLAS_CONFIG.anonKey);
  state.remoteEnabled = true;
  setSyncStatus(t('connecting'), 'busy');
  const { data, error } = await remoteClient.from('products').select('*').order('updated_at', { ascending: false });
  if (error) {
    console.error('Supabase load failed', error);
    setSyncStatus(t('connectionFail'), 'error');
    if (notify) showToast(t('refreshFailed'));
    return false;
  }
  if (data.length) {
    state.products = data.map(fromRemoteProduct);
  } else {
    const { error: seedError } = await remoteClient.from('products').upsert(seedProducts.map(toRemoteProduct));
    if (seedError) {
      console.error('Supabase seed failed', seedError);
      setSyncStatus(t('connectionFail'), 'error');
      if (notify) showToast(t('refreshFailed'));
      return false;
    }
    state.products = seedProducts;
  }
  saveProducts();
  setSyncStatus(t('cloudSynced'));
  renderAll();
  if (notify) showToast(t('refreshed'));
  return true;
}

async function initRemote() {
  await refreshRemoteData();
}

async function handleRefresh() {
  const button = $('#refreshData');
  if (!button || button.disabled) return;
  button.disabled = true;
  button.classList.add('is-refreshing');
  button.setAttribute('aria-label', t('refreshingData'));
  button.setAttribute('title', t('refreshingData'));
  try {
    await refreshRemoteData({ notify: true });
  } finally {
    button.disabled = false;
    button.classList.remove('is-refreshing');
    button.setAttribute('aria-label', t('refreshData'));
    button.setAttribute('title', t('refreshData'));
  }
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
  if (!value) return t('justUpdated');
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t('justUpdated');
  return state.language === 'zh' ? `${date.getMonth() + 1}/${date.getDate()} ${t('updated')}` : `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')} ${t('updated')}`;
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
  applyLanguage();
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
    const zones = data.zones.map((zone) => `<button class="zone-button ${state.floor === floor && state.zone === zone ? 'active' : ''} ${productCountForZone(floor, zone) ? 'occupied' : ''}" data-zone="${zone}" data-floor="${floor}" aria-label="${floorLabel(floor)} ${zone} ${state.language === 'ru' ? 'зона' : state.language === 'kk' ? 'аймағы' : '区'}，${productCountForZone(floor, zone)} ${t('pieces')}">${zone}</button>`).join('');
    return `<div class="floor-group"><button class="floor-button ${state.floor === floor ? 'active' : ''}" data-floor-only="${floor}"><span class="floor-label"><span class="floor-number">0${floorIndex + 1}</span>${floorLabel(floor)}</span><span class="floor-total">${total} ${t('pieces')}</span></button><div class="zone-list">${zones}</div></div>`;
  }).join('');
  $('#zoneCount').textContent = `${Object.values(FLOORS).reduce((sum, floor) => sum + floor.zones.length, 0)} ${t('zones')}`;
  $$('.floor-button').forEach((button) => button.addEventListener('click', () => selectFloor(button.dataset.floorOnly)));
  $$('.zone-button').forEach((button) => button.addEventListener('click', () => selectZone(button.dataset.floor, button.dataset.zone)));
}

function renderMobileFloorBar() {
  const rules = LOCATION_RULES[state.language] || LOCATION_RULES.zh;
  $('#mobileFloorBar').innerHTML = `<div class="mobile-floor-options">${Object.entries(FLOORS).map(([floor]) => `<button class="mobile-floor-button ${state.floor === floor ? 'active' : ''}" data-mobile-floor="${floor}">${floorLabel(floor)} <span>${floorProducts(floor).length}</span></button>`).join('')}</div><button type="button" class="mobile-floor-button mobile-rules-button" data-open-rules="true" aria-label="${escapeHTML(rules.open)}" title="${escapeHTML(rules.open)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.1 7.5 7.5 9.5 4.4-1.7 7.5-4.9 7.5-9.5V6L12 3Z"></path><path d="M12 8v4M12 15h.01"></path></svg><span>${escapeHTML(rules.button)}</span></button>`;
  $$('[data-mobile-floor]').forEach((button) => button.addEventListener('click', () => selectFloor(button.dataset.mobileFloor)));
  $('[data-open-rules]')?.addEventListener('click', openLocationRules);
}

function renderHeaderStats() {
  const products = floorProducts();
  $('#activeFloorLabel').textContent = floorLabel(state.floor);
  $('#floorProductCount').textContent = products.length;
  $('#floorProductHint').textContent = products.length === 1 ? t('toOrganize') : t('registered');
}

function renderArea() {
  const data = FLOORS[state.floor];
  const copy = zoneCopy(state.zone);
  $('#currentAreaName').textContent = state.language === 'zh' ? `${state.zone} 区` : `${state.zone} ${state.language === 'ru' ? 'зона' : 'аймағы'}`;
  $('#currentAreaMeta').textContent = `${floorLabel(state.floor)} · ${copy[0]}`;
  $('#zoneMap').innerHTML = data.zones.map((zone) => `<button class="map-zone ${state.zone === zone ? 'active' : ''} ${productCountForZone(state.floor, zone) ? 'occupied' : ''}" data-map-zone="${zone}">${zone}<span class="sr-only"> ${productCountForZone(state.floor, zone)} ${t('pieces')}</span></button>`).join('');
  $$('.map-zone').forEach((button) => button.addEventListener('click', () => selectZone(state.floor, button.dataset.mapZone)));

  const products = zoneProducts();
  $('#productGrid').innerHTML = products.map(productCard).join('');
  $('#emptyState').hidden = products.length > 0;
  $$('.edit-product').forEach((button) => button.addEventListener('click', () => openEdit(button.dataset.id)));
  $$('.delete-product').forEach((button) => button.addEventListener('click', () => deleteProduct(button.dataset.id)));
}

function productCard(product) {
  const image = product.image ? `<img src="${product.image}" alt="${escapeHTML(product.number)}" />` : `<span class="placeholder-mark">${escapeHTML(product.zone)}</span>`;
  const location = state.language === 'zh' ? `${product.floor} / ${product.zone}` : `${floorShortLabel(product.floor)} / ${product.zone}`;
  const stockStatus = product.stockStatus || 'ample';
  const stockLabel = t(stockStatus === 'restock' ? 'stockRestock' : stockStatus === 'normal' ? 'stockNormal' : 'stockAmple');
  const price = product.price !== '' && product.price !== null && product.price !== undefined ? `<span class="product-price">${escapeHTML(t('pricePrefix'))} ${escapeHTML(product.price)}</span>` : '';
  return `<article class="product-card"><div class="product-image ${product.image ? '' : 'placeholder'}">${image}</div><div class="product-info"><span class="product-location">${escapeHTML(location)}</span><div class="product-heading-row"><h3 class="product-number" title="${escapeHTML(product.number)}">${escapeHTML(product.number)}</h3>${price}</div><p class="product-type">${escapeHTML(product.type)}</p><span class="stock-badge stock-${stockStatus}"><span class="stock-badge-dot" aria-hidden="true"></span>${escapeHTML(stockLabel)}</span><p class="product-details">${escapeHTML(product.details || t('noDetails'))}</p><div class="product-card-footer"><span class="product-date">${formatDate(product.updatedAt)}</span><div class="card-actions"><button class="card-action edit-product" data-id="${product.id}" aria-label="${escapeHTML(t('editProduct'))} ${escapeHTML(product.number)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16-.7 4.7L8 20l11.3-11.3a2.1 2.1 0 0 0 3-3L5 17Z"></path><path d="m14.8 7.2 2 2"></path></svg></button><button class="card-action delete delete-product" data-id="${product.id}" aria-label="${escapeHTML(t('delete'))} ${escapeHTML(product.number)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"></path></svg></button></div></div></div></article>`;
}

function renderInspector() {
  const data = FLOORS[state.floor];
  const copy = zoneCopy(state.zone);
  const products = zoneProducts();
  const imageCount = products.filter((product) => product.image).length;
  $('#inspectorZone').textContent = state.zone;
  $('#inspectorTitle').textContent = copy[0];
  $('#inspectorCopy').textContent = copy[1];
  $('#inspectorFloor').textContent = floorLabel(state.floor);
  $('#inspectorProducts').textContent = `${products.length} ${t('pieces')}`;
  $('#inspectorImages').textContent = `${products.length ? Math.round((imageCount / products.length) * 100) : 0}%`;
  $('#miniMapLabel').textContent = state.floor;
  $('#miniMap').innerHTML = data.zones.map((zone) => `<button class="mini-map-zone ${productCountForZone(state.floor, zone) ? 'occupied' : ''} ${state.zone === zone ? 'active' : ''}" data-mini-zone="${zone}" aria-label="${zone} ${state.language === 'ru' ? 'зона' : state.language === 'kk' ? 'аймағы' : '区'}">${zone}</button>`).join('');
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
  $('#dialogEyebrow').textContent = t('addProduct');
  $('#dialogTitle').textContent = t('addProduct');
  $('#saveProductText').textContent = t('saveProduct');
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
  $('#dialogEyebrow').textContent = t('editProduct');
  $('#dialogTitle').textContent = t('editProduct');
  $('#saveProductText').textContent = t('saveChanges');
  $('#productNumber').value = product.number;
  $('#productType').value = product.type;
  $('#productPrice').value = product.price || '';
  $(`input[name="stockStatus"][value="${product.stockStatus || 'ample'}"]`).checked = true;
  $('#productDetails').value = product.details || '';
  fillFloorOptions(product.floor, product.zone);
  setImagePreview(product.image || '');
  updateDetailCount();
  $('#productDialog').showModal();
  setTimeout(() => $('#productNumber').focus(), 30);
}

function fillFloorOptions(selectedFloor, selectedZone) {
  $('#productFloor').innerHTML = Object.entries(FLOORS).map(([floor]) => `<option value="${floor}" ${floor === selectedFloor ? 'selected' : ''}>${floorLabel(floor)}（${floor}）</option>`).join('');
  const renderZones = () => {
    const floor = $('#productFloor').value;
    $('#productZone').innerHTML = FLOORS[floor].zones.map((zone) => `<option value="${zone}" ${zone === selectedZone && floor === selectedFloor ? 'selected' : ''}>${zone} ${state.language === 'ru' ? 'зона' : state.language === 'kk' ? 'аймағы' : '区'}</option>`).join('');
  };
  renderZones();
  $('#productFloor').onchange = renderZones;
}

function setImagePreview(src) {
  $('#imagePreview').innerHTML = src ? `<img src="${src}" alt="${escapeHTML(t('productImage'))}" />` : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"></path><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m4 17 4.5-4.5 3 3 2-2L20 19"></path></svg><span>${escapeHTML(t('noImage'))}</span>`;
  $('#removeImage').hidden = !src;
  $('#productImage').dataset.value = src || '';
}

async function deleteProduct(id) {
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  if (!window.confirm(t('confirmDelete', { number: product.number }))) return;
  state.products = state.products.filter((item) => item.id !== id);
  saveProducts();
  renderAll();
  showToast(state.remoteEnabled ? t('savedSyncing') : t('deleted'));
  if (state.remoteEnabled) {
    try {
      await removeRemoteProduct(id);
      setSyncStatus('云端已同步');
      showToast(t('deleteShared'));
    } catch (error) {
      console.error('Supabase delete failed', error);
      setSyncStatus(t('connectionFail'), 'error');
      showToast(t('deleteFailed'));
    }
  }
}

function renderSearchResults() {
  const query = state.query.trim().toLowerCase();
  const panel = $('#searchResults');
  if (!query) { panel.hidden = true; return; }
  const results = state.products.filter((product) => [product.number, product.type, product.price, product.stockStatus, product.details, product.zone, product.floor, floorLabel(product.floor), t(product.stockStatus === 'restock' ? 'stockRestock' : product.stockStatus === 'normal' ? 'stockNormal' : 'stockAmple')].join(' ').toLowerCase().includes(query)).slice(0, 8);
  panel.innerHTML = results.length ? results.map((product) => `<button class="search-result" data-search-id="${product.id}"><span class="search-result-thumb">${product.image ? `<img src="${product.image}" alt="" />` : escapeHTML(product.zone)}</span><span class="search-result-main"><strong>${escapeHTML(product.number)}</strong><span>${escapeHTML(product.type)} · ${escapeHTML(floorLabel(product.floor))} ${escapeHTML(product.zone)} ${state.language === 'ru' ? 'зона' : state.language === 'kk' ? 'аймағы' : '区'}</span></span></button>`).join('') : `<div class="search-empty">${escapeHTML(t('noResults'))}</div>`;
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
  showToast(state.language === 'ru' ? 'Данные товаров экспортированы' : state.language === 'kk' ? 'Тауар деректері экспортталды' : '货品数据已导出');
}

$('#quickAdd').addEventListener('click', openAdd);
$('#areaAdd').addEventListener('click', openAdd);
$('#emptyAdd').addEventListener('click', openAdd);
$('#exportData').addEventListener('click', exportData);
$('#refreshData').addEventListener('click', handleRefresh);
function openLocationRules() { renderLocationRules(); $('#locationRulesDialog').showModal(); }
$('#locationRulesDesktop').addEventListener('click', openLocationRules);
$('#closeLocationRules').addEventListener('click', () => $('#locationRulesDialog').close());
$('#locationRulesDialog').addEventListener('click', (event) => { if (event.target === $('#locationRulesDialog')) $('#locationRulesDialog').close(); });
$('#closeDialog').addEventListener('click', () => $('#productDialog').close());
$('#cancelDialog').addEventListener('click', () => $('#productDialog').close());
$('#productDialog').addEventListener('click', (event) => { if (event.target === $('#productDialog')) $('#productDialog').close(); });
$('#productDetails').addEventListener('input', updateDetailCount);
$('#globalSearch').addEventListener('input', (event) => { state.query = event.target.value; $('#clearSearch').hidden = !state.query; renderSearchResults(); });
$('#clearSearch').addEventListener('click', () => { state.query = ''; $('#globalSearch').value = ''; $('#clearSearch').hidden = true; renderSearchResults(); $('#globalSearch').focus(); });
$('#productImage').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 4 * 1024 * 1024) { showToast(t('imageTooLarge')); event.target.value = ''; return; }
  const reader = new FileReader();
  reader.onload = () => setImagePreview(reader.result);
  reader.readAsDataURL(file);
});
$('#removeImage').addEventListener('click', () => { setImagePreview(''); $('#productImage').value = ''; });
$('#languageSelect').addEventListener('change', (event) => {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  renderAll();
});
$('#productForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const product = { number: $('#productNumber').value.trim(), type: $('#productType').value.trim(), price: $('#productPrice').value.trim(), stockStatus: document.querySelector('input[name="stockStatus"]:checked')?.value || 'ample', floor: $('#productFloor').value, zone: $('#productZone').value, details: $('#productDetails').value.trim(), image: $('#productImage').dataset.value || '', updatedAt: new Date().toISOString() };
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
  showToast(state.remoteEnabled ? t('savedSyncing') : (state.editingId ? t('updatedProduct') : t('added')));
  if (state.remoteEnabled) {
    try {
      setSyncStatus(t('syncing'), 'busy');
      const syncedProduct = await upsertRemoteProduct(savedProduct);
      state.products = state.products.map((item) => item.id === syncedProduct.id ? syncedProduct : item);
      saveProducts();
      setSyncStatus(t('cloudSynced'));
      renderAll();
      showToast(state.editingId ? t('syncedUpdated') : t('syncedAdded'));
    } catch (error) {
      console.error('Supabase save failed', error);
      setSyncStatus(t('connectionFail'), 'error');
      showToast(t('syncFailed'));
    }
  }
});

renderAll();
initRemote();
