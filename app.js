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
const LAST_SYNC_KEY = 'store-atlas-last-sync';
const DEVICE_TOKEN_KEY = 'store-atlas-device-token';
const TRANSLATIONS = {
  zh: {
    title: '店面货品摆放 · 区域台账', brand: '店面货品摆放', navigate: 'NAVIGATE', areas: '摆放区域', storeMap: 'STORE MAP',
    intro: '按楼层和区域整理陈列信息，现场查找时一眼就能定位。', heroMapLine1: '现场区域', heroMapLine2: '快速定位',
    floorProducts: '当前楼层货品', restockCenter: '补货中心', restockCenterTitle: '需要补货', restockCenterIntro: '集中处理需要补货的货品，完成后可直接更新状态。', restockCount: '件待补货', restockEmpty: '暂无需要补货的货品', markRestocked: '已补货', restocked: '已标记为充裕', restockFailed: '补货状态同步失败，已保留本地修改', refreshData: '刷新云端数据', refreshingData: '正在刷新云端数据…', refreshed: '云端数据已刷新', refreshFailed: '刷新失败，请检查云端连接',
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
    floorProducts: 'Осы қабаттағы тауар', restockCenter: 'Толықтыру орталығы', restockCenterTitle: 'Толықтыру қажет', restockCenterIntro: 'Толықтыруды қажет ететін тауарларды бір жерден өңдеп, күйін бірден жаңартыңыз.', restockCount: 'тауар толықтыруды күтуде', restockEmpty: 'Толықтыруды қажет ететін тауар жоқ', markRestocked: 'Толықтырылды', restocked: 'Тауар жеткілікті деп белгіленді', restockFailed: 'Толықтыру күйін синхрондау сәтсіз, жергілікті өзгеріс сақталды', refreshData: 'Бұлттағы деректерді жаңарту', refreshingData: 'Бұлттағы деректер жаңартылуда…', refreshed: 'Бұлттағы деректер жаңартылды', refreshFailed: 'Жаңарту сәтсіз, бұлт байланысын тексеріңіз',
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
    floorProducts: 'Товары на этаже', restockCenter: 'Центр пополнения', restockCenterTitle: 'Нужно пополнить', restockCenterIntro: 'Список товаров для пополнения: обновляйте статус сразу после пополнения.', restockCount: 'товаров к пополнению', restockEmpty: 'Нет товаров, требующих пополнения', markRestocked: 'Пополнено', restocked: 'Товар отмечен как доступный', restockFailed: 'Не удалось синхронизировать статус пополнения, локальные изменения сохранены', refreshData: 'Обновить облачные данные', refreshingData: 'Обновление облачных данных…', refreshed: 'Облачные данные обновлены', refreshFailed: 'Не удалось обновить, проверьте облачное соединение',
    currentZone: 'ТЕКУЩАЯ ЗОНА', export: 'Экспорт', addToZone: 'Добавить в зону', emptyTitle: 'В этой зоне пока нет товаров', emptyCopy: 'Добавьте первый товар и создайте карту магазина.', emptyAdd: 'Добавить первый товар',
    zoneNote: 'ЗАМЕТКА ЗОНЫ', floorLayout: 'План этажа', tip: 'Совет: реальное фото поможет сотрудникам быстрее найти товар и его место.', productImage: 'Фото товара', imageHint: 'Загрузите чёткое фото товара или полки', chooseImage: 'Выбрать фото', removeImage: 'Удалить фото',
    productNumber: 'Артикул <i>*</i>', productType: 'Тип товара <i>*</i>', productPrice: 'Цена товара (необязательно)', productFloor: 'Этаж <i>*</i>', productZone: 'Зона <i>*</i>', stockStatus: 'Состояние количества', stockAmple: 'В наличии', stockNormal: 'Норма', stockRestock: 'Нужно пополнить', pricePrefix: 'Цена', details: 'Описание', cancel: 'Отмена',
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

const state = {
  floor: '1F',
  zone: 'A',
  products: loadProducts(),
  editingId: null,
  query: '',
  language: localStorage.getItem(LANGUAGE_KEY) || 'zh',
  remoteEnabled: false,
  online: navigator.onLine,
  session: null,
  profile: null,
  verificationPending: false,
  realtimeChannel: null,
  highlightId: null,
  sessionCheckTimer: null,
  sessionCheckRunning: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const products = Array.isArray(stored) ? stored : [];
    return products.map((product) => ({ ...product, price: product.price === null || product.price === undefined ? '' : String(product.price), stockStatus: ['ample', 'normal', 'restock'].includes(product.stockStatus) ? product.stockStatus : 'ample' }));
  } catch (error) {
    return [];
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
  const suffix = state.language === 'ru' ? 'ru' : state.language === 'kk' ? 'kk' : 'zh';
  return {
    id: row.id,
    number: row.number,
    type: row[`type_${suffix}`] || row.type,
    sourceType: row.type,
    typeZh: row.type_zh || row.type || '', typeRu: row.type_ru || '', typeKk: row.type_kk || '',
    price: row.price === null || row.price === undefined || row.price === '' ? '' : String(row.price),
    stockStatus: ['ample', 'normal', 'restock'].includes(row.stock_status) ? row.stock_status : 'ample',
    floor: row.floor,
    zone: row.zone,
    details: row[`details_${suffix}`] || row.details || '',
    sourceDetails: row.details || '',
    detailsZh: row.details_zh || row.details || '', detailsRu: row.details_ru || '', detailsKk: row.details_kk || '',
    image: row.image || '',
    imagePath: row.image_path || '',
    translationStatus: row.translation_status || 'pending',
    sourceLanguage: row.source_language || 'zh',
    restockSince: row.restock_since || null,
    moveNoticeUntil: row.move_notice_until || null,
    moveNoticeFrom: row.move_notice_from || '',
    deletedAt: row.deleted_at || null,
    deleteReason: row.delete_reason || '',
    updatedAt: row.updated_at || new Date().toISOString()
  };
}

function toRemoteProduct(product) {
  return {
    id: product.id,
    number: product.number,
    type: product.sourceType || product.type,
    price: product.price === '' || product.price === null || product.price === undefined ? null : Number(product.price),
    stock_status: product.stockStatus || 'ample',
    floor: product.floor,
    zone: product.zone,
    details: product.sourceDetails ?? product.details ?? '',
    image: product.image || '',
    image_path: product.imagePath || null,
    source_language: product.sourceLanguage || state.language,
    translation_status: product.translationStatus || 'pending',
    type_zh: product.typeZh || null, type_ru: product.typeRu || null, type_kk: product.typeKk || null,
    details_zh: product.detailsZh || null, details_ru: product.detailsRu || null, details_kk: product.detailsKk || null
  };
}

function canEdit() { return Boolean(state.profile && state.profile.is_active && !state.profile.must_change_password && state.online && state.remoteEnabled); }
function isAdmin() { return ['owner', 'admin'].includes(state.profile?.role); }
function isOwner() { return state.profile?.role === 'owner'; }
function activeProducts() { return state.products.filter((product) => !product.deletedAt); }
function deviceToken() {
  let value = localStorage.getItem(DEVICE_TOKEN_KEY);
  if (!value) { value = crypto.randomUUID(); localStorage.setItem(DEVICE_TOKEN_KEY, value); }
  return value;
}
function deviceInfo() {
  const mobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
  return { deviceToken: deviceToken(), deviceLabel: mobile ? '手机或平板' : '电脑', browserLabel: /Edg/i.test(navigator.userAgent) ? 'Microsoft Edge' : /Chrome/i.test(navigator.userAgent) ? 'Chrome' : /Safari/i.test(navigator.userAgent) ? 'Safari' : '浏览器' };
}

async function refreshRemoteData({ notify = false } = {}) {
  if (!remoteConfigured()) {
    state.remoteEnabled = false;
    setSyncStatus(t('localMode'));
    if (notify) showToast(t('refreshFailed'));
    return false;
  }
  if (!remoteClient) remoteClient = window.supabase.createClient(STORE_ATLAS_CONFIG.url, STORE_ATLAS_CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  state.remoteEnabled = true;
  setSyncStatus(t('connecting'), 'busy');
  const { data, error } = await remoteClient.from('products').select('*').order('updated_at', { ascending: false });
  if (error) {
    console.error('Supabase load failed', error);
    setSyncStatus(t('connectionFail'), 'error');
    if (notify) showToast(t('refreshFailed'));
    return false;
  }
  state.products = (data || []).map(fromRemoteProduct);
  saveProducts();
  localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
  setSyncStatus(t('cloudSynced'));
  renderAll();
  if (notify) showToast(t('refreshed'));
  return true;
}

async function initRemote() {
  if (!remoteConfigured()) { updateAccessUI(); renderAll(); return; }
  if (!remoteClient) remoteClient = window.supabase.createClient(STORE_ATLAS_CONFIG.url, STORE_ATLAS_CONFIG.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  const { data } = await remoteClient.auth.getSession();
  state.session = data.session;
  if (state.session) await loadProfile();
  remoteClient.auth.onAuthStateChange(async (_event, session) => { state.session = session; if (session) await loadProfile(); else state.profile = null; updateAccessUI(); renderAll(); });
  await refreshRemoteData();
  subscribeRealtime();
  updateAccessUI();
  scheduleSessionValidation();
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

async function uploadRemoteImage(product, { removePrevious = true } = {}) {
  if (!remoteClient || !product.image || !product.image.startsWith('data:')) return product;
  const response = await fetch(product.image);
  const blob = await response.blob();
  const extension = (blob.type.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
  const path = `${product.id}-${Date.now()}.${extension}`;
  const { error: uploadError } = await remoteClient.storage.from('product-images').upload(path, blob, { upsert: true, contentType: blob.type });
  if (uploadError) throw uploadError;
  const { data } = remoteClient.storage.from('product-images').getPublicUrl(path);
  if (removePrevious && product.imagePath && product.imagePath !== path) await remoteClient.storage.from('product-images').remove([product.imagePath]).catch(() => undefined);
  return { ...product, image: data.publicUrl, imagePath: path };
}

async function upsertRemoteProduct(product) {
  if (!remoteClient) return product;
  const previousPath = product.imagePath || '';
  const remoteProduct = await uploadRemoteImage(product, { removePrevious: false });
  const { error } = await remoteClient.from('products').upsert(toRemoteProduct(remoteProduct));
  if (error) throw error;
  const sharedPreviousImage = state.products.some((item) => item.id !== product.id && item.imagePath === previousPath && !item.deletedAt);
  if (previousPath && previousPath !== remoteProduct.imagePath && !sharedPreviousImage) await remoteClient.storage.from('product-images').remove([previousPath]).catch(() => undefined);
  const { data, error: readError } = await remoteClient.from('products').select('*').eq('id', remoteProduct.id).single();
  if (readError) throw readError;
  return fromRemoteProduct(data);
}

async function requestTranslation(productId) {
  try { await remoteClient.functions.invoke('translate-product', { body: { productId } }); }
  catch (error) { console.warn('Translation queued but not completed', error); }
}

async function moveRemoteProduct(source, product) {
  const uploaded = await uploadRemoteImage(product, { removePrevious: false });
  const { data, error } = await remoteClient.rpc('move_product', {
    p_source_id: source.id, p_new_id: product.id, p_floor: product.floor, p_zone: product.zone,
    p_number: product.number, p_type: product.sourceType || product.type, p_details: product.sourceDetails ?? product.details ?? '',
    p_price: product.price === '' ? null : Number(product.price), p_stock_status: 'ample', p_image: uploaded.image || '', p_image_path: uploaded.imagePath || null, p_source_language: product.sourceLanguage || state.language
  });
  if (error) throw error;
  return fromRemoteProduct(data);
}

async function removeRemoteProduct(id) {
  if (!remoteClient) return;
  const { error } = await remoteClient.from('products').update({ deleted_at: new Date().toISOString(), deleted_by: state.profile?.id || null, delete_reason: 'manual' }).eq('id', id);
  if (error) throw error;
}

async function loadProfile() {
  if (!remoteClient || !state.session?.user) { state.profile = null; return null; }
  const { data, error } = await remoteClient.from('staff_profiles').select('*').eq('id', state.session.user.id).maybeSingle();
  if (error || !data?.is_active || data.deleted_at) {
    await remoteClient.auth.signOut(); state.profile = null; return null;
  }
  state.profile = data;
  return data;
}

async function callStaffApi(action, payload = {}, authenticated = true) {
  const headers = { 'Content-Type': 'application/json', apikey: STORE_ATLAS_CONFIG.anonKey };
  if (authenticated && state.session?.access_token) headers.Authorization = `Bearer ${state.session.access_token}`;
  const response = await fetch(`${STORE_ATLAS_CONFIG.url}/functions/v1/staff-api`, { method: 'POST', headers, body: JSON.stringify({ action, ...payload }) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(result.error || 'request_failed'); error.code = result.error; error.status = response.status; error.result = result; throw error; }
  return result;
}

function updateAccessUI() {
  const staff = Boolean(state.profile);
  document.body.classList.toggle('staff-mode', staff);
  document.body.classList.toggle('admin-mode', isAdmin());
  $$('[data-staff-only]').forEach((element) => { element.hidden = !staff; });
  $$('[data-admin-only]').forEach((element) => { element.hidden = !isAdmin(); });
  const label = $('#accountButtonLabel'); const avatar = $('.account-avatar');
  if (label) label.textContent = staff ? state.profile.display_name : '员工登录';
  if (avatar) avatar.textContent = staff ? (state.profile.display_name || state.profile.username).slice(0, 1) : '访';
  const offline = !state.online || !state.remoteEnabled;
  $('#offlineBanner').hidden = !offline;
  if (offline) {
    const last = localStorage.getItem(LAST_SYNC_KEY); const text = last ? new Date(last).toLocaleString() : '尚未成功同步';
    $('#offlineMessage').textContent = `当前只可查看最近缓存，最后同步：${text}`;
  }
}

function resetLoginFlow() {
  state.verificationPending = false;
  $("#loginForm")?.reset();
  $("#loginError").hidden = true;
  $("#passwordLoginFields").hidden = false;
  $("#verificationFields").hidden = true;
  $("#loginSubmit").textContent = "登录";
}

async function validateCurrentSession({ notify = false } = {}) {
  if (!state.session || !remoteClient || state.sessionCheckRunning || !navigator.onLine) return Boolean(state.session);
  state.sessionCheckRunning = true;
  try {
    const result = await callStaffApi("validate_session", { ...deviceInfo() });
    state.profile = result.profile;
    updateAccessUI();
    if (state.profile?.must_change_password && !$("#passwordDialog").open) $("#passwordDialog").showModal();
    return true;
  } catch (error) {
    if (["unauthorized", "session_revoked"].includes(error.code) || error.status === 401) {
      await remoteClient.auth.signOut({ scope: "local" }).catch(() => undefined);
      state.session = null;
      state.profile = null;
      updateAccessUI();
      renderAll();
      if (notify) showToast("登录状态已失效，已退回游客模式");
      return false;
    }
    return true;
  } finally {
    state.sessionCheckRunning = false;
  }
}

function scheduleSessionValidation() {
  clearInterval(state.sessionCheckTimer);
  state.sessionCheckTimer = setInterval(() => validateCurrentSession({ notify: true }), 60_000);
}

function subscribeRealtime() {
  if (!remoteClient) return;
  if (state.realtimeChannel) remoteClient.removeChannel(state.realtimeChannel);
  state.realtimeChannel = remoteClient.channel('store-atlas-products').on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => refreshRemoteData()).subscribe();
}

async function acceptSession(result) {
  if (!result.access_token || !result.refresh_token) throw new Error('session_missing');
  const { data, error } = await remoteClient.auth.setSession({ access_token: result.access_token, refresh_token: result.refresh_token });
  if (error) throw error;
  state.session = data.session; state.profile = result.profile || await loadProfile();
  updateAccessUI(); await refreshRemoteData();
  $('#loginDialog').close();
  if (state.profile?.must_change_password) $('#passwordDialog').showModal();
}

async function handleLogin(event) {
  event.preventDefault();
  const errorBox = $('#loginError'); errorBox.hidden = true; $('#loginSubmit').disabled = true;
  try {
    if (state.verificationPending) {
      const result = await callStaffApi('verify_device', { username: $('#loginUsername').value, code: $('#loginCode').value, ...deviceInfo() }, false);
      await acceptSession(result); state.verificationPending = false;
    } else {
      const result = await callStaffApi('login', { username: $('#loginUsername').value, password: $('#loginPassword').value, ...deviceInfo() }, false);
      if (result.verificationRequired) {
        state.verificationPending = true; $('#passwordLoginFields').hidden = true; $('#verificationFields').hidden = false; $('#loginSubmit').textContent = '验证并登录'; $('#loginCode').focus(); return;
      }
      await acceptSession(result);
    }
  } catch (error) {
    const messages = { invalid_credentials: '账号或密码不正确。', locked: `账号已暂时锁定，请在 ${new Date(error.result?.lockedUntil).toLocaleTimeString()} 后重试。`, invalid_verification: '验证码不正确或已经过期。', verification_unavailable: '暂时无法发送验证邮件，请稍后再试。' };
    errorBox.textContent = messages[error.code] || '登录失败，请检查网络后重试。'; errorBox.hidden = false;
  } finally { $('#loginSubmit').disabled = false; }
}

async function changeOwnPassword(event) {
  event.preventDefault(); const password = $('#newPassword').value; const confirm = $('#confirmPassword').value; const box = $('#passwordError'); box.hidden = true;
  if (password.length < 8 || password !== confirm) { box.textContent = password.length < 8 ? '密码至少需要 8 个字符。' : '两次输入的密码不一致。'; box.hidden = false; return; }
  try {
    const { error } = await remoteClient.auth.updateUser({ password }); if (error) throw error;
    await callStaffApi('password_changed'); state.profile.must_change_password = false; $('#passwordDialog').close(); showToast('密码已更新');
  } catch (error) { box.textContent = '密码更新失败，请稍后重试。'; box.hidden = false; }
}

async function logout() {
  await remoteClient?.auth.signOut(); state.session = null; state.profile = null; updateAccessUI(); $('#staffMenuDialog').close(); await refreshRemoteData(); showToast('已退回访客模式');
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
  return activeProducts().filter((product) => product.floor === floor);
}

function zoneProducts(floor = state.floor, zone = state.zone) {
  return activeProducts().filter((product) => product.floor === floor && product.zone === zone);
}

function productCountForZone(floor, zone) {
  return activeProducts().filter((product) => product.floor === floor && product.zone === zone).length;
}

function renderAll() {
  updateAccessUI();
  applyLanguage();
  renderNavigation();
  renderMobileFloorBar();
  renderHeaderStats();
  renderArea();
  renderInspector();
  renderRestockCenter();
  renderSearchResults();
  renderMergePanel();
}

function renderNavigation() {
  const nav = $('#floorNav');
  nav.innerHTML = Object.entries(FLOORS).map(([floor, data], floorIndex) => {
    const total = floorProducts(floor).length;
    const zones = data.zones.map((zone) => `<button class="zone-button ${state.floor === floor && state.zone === zone ? 'active' : ''} ${productCountForZone(floor, zone) ? 'occupied' : ''}" data-zone="${zone}" data-floor="${floor}" aria-label="${floorLabel(floor)} ${zone} ${state.language === 'ru' ? 'зона' : state.language === 'kk' ? 'аймағы' : '区'}，${productCountForZone(floor, zone)} ${t('pieces')}">${zone}</button>`).join('');
    return `<div class="floor-group"><button class="floor-button ${state.floor === floor ? 'active' : ''}" data-floor-only="${floor}"><span class="floor-label"><span class="floor-number">0${floorIndex + 1}</span>${floorLabel(floor)}</span><span class="floor-total">${total} ${t('pieces')}</span></button><div class="zone-list">${zones}</div></div>`;
  }).join('');
  $('#zoneCount').textContent = `${Object.values(FLOORS).reduce((sum, floor) => sum + floor.zones.length, 0)} ${t('zones')}`;
  const restockCount = state.products.filter((product) => product.stockStatus === 'restock').length;
  const restockButton = $('#restockTop');
  if (restockButton) {
    restockButton.setAttribute('aria-label', `${t('restockCenter')}，${restockCount} ${t('restockCount')}`);
    restockButton.setAttribute('title', t('restockCenter'));
  }
  if ($('#restockTopCount')) $('#restockTopCount').textContent = restockCount;
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

function restockCard(product) {
  const image = product.image ? `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.number)}" />` : `<span class="placeholder-mark">${escapeHTML(product.zone)}</span>`;
  const location = state.language === 'zh' ? `${product.floor} / ${product.zone}` : `${floorShortLabel(product.floor)} / ${product.zone}`;
  const details = product.details || t('noDetails');
  const price = product.price !== '' && product.price !== null && product.price !== undefined ? `<span class="restock-price">${escapeHTML(t('pricePrefix'))} ${escapeHTML(product.price)}</span>` : '';
  return `<article class="restock-item"><div class="restock-item-image ${product.image ? '' : 'placeholder'}">${image}</div><div class="restock-item-main"><div class="restock-item-top"><span class="product-location">${escapeHTML(location)}</span><span class="stock-badge stock-restock"><span class="stock-badge-dot" aria-hidden="true"></span>${escapeHTML(t('stockRestock'))}</span></div><div class="restock-item-heading"><h3>${escapeHTML(product.number)}</h3>${price}</div><p class="restock-item-type">${escapeHTML(product.type)}</p><p class="restock-item-details">${escapeHTML(details)}</p><div class="restock-item-footer"><span class="restock-item-date">${formatDate(product.updatedAt)}</span><div class="restock-item-actions"><button type="button" class="secondary-button restock-edit" data-id="${escapeHTML(product.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16-.7 4.7L8 20l11.3-11.3a2.1 2.1 0 0 0 3-3L5 17Z"></path><path d="m14.8 7.2 2 2"></path></svg><span>${escapeHTML(t('editProduct'))}</span></button><button type="button" class="primary-button restock-done" data-id="${escapeHTML(product.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg><span>${escapeHTML(t('markRestocked'))}</span></button></div></div></div></article>`;
}

function renderRestockCenter() {
  const restockProducts = activeProducts().filter((product) => product.stockStatus === 'restock').sort((a, b) => a.floor.localeCompare(b.floor) || a.zone.localeCompare(b.zone));
  const content = $('#restockContent');
  if (!content) return;
  content.innerHTML = restockProducts.length
    ? `<div class="restock-summary"><strong>${restockProducts.length}</strong><span>${escapeHTML(t('restockCount'))}</span></div><div class="restock-list">${restockProducts.map(restockCard).join('')}</div>`
    : `<div class="restock-empty"><div class="empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9Z"></path><path d="m4 7.5 8 4 8-4M12 11.5V20"></path></svg></div><h3>${escapeHTML(t('restockEmpty'))}</h3><p>${escapeHTML(t('restockCenterIntro'))}</p></div>`;
  $$('.restock-edit').forEach((button) => button.addEventListener('click', () => openEdit(button.dataset.id)));
  $$('.restock-done').forEach((button) => button.addEventListener('click', () => markProductRestocked(button.dataset.id)));
}

function openRestockCenter() {
  renderRestockCenter();
  $('#restockDialog')?.showModal();
}

async function markProductRestocked(id) {
  if (!canEdit()) { showToast('离线或未登录时不能修改'); return; }
  const product = state.products.find((item) => item.id === id);
  if (!product || product.stockStatus !== 'restock') return;
  const updatedProduct = { ...product, stockStatus: 'ample', updatedAt: new Date().toISOString() };
  try {
    setSyncStatus(t('syncing'), 'busy');
    const syncedProduct = await upsertRemoteProduct(updatedProduct);
    state.products = state.products.map((item) => item.id === syncedProduct.id ? syncedProduct : item);
    saveProducts();
    setSyncStatus(t('cloudSynced'));
    renderAll();
    showToast(t('restocked'));
  } catch (error) {
    console.error('Supabase restock update failed', error);
    setSyncStatus(t('connectionFail'), 'error');
    showToast(t('restockFailed'));
  }
}

function productCard(product) {
  const image = product.image ? `<img src="${product.image}" alt="${escapeHTML(product.number)}" />` : `<span class="placeholder-mark">${escapeHTML(product.zone)}</span>`;
  const location = state.language === 'zh' ? `${product.floor} / ${product.zone}` : `${floorShortLabel(product.floor)} / ${product.zone}`;
  const stockStatus = product.stockStatus || 'ample';
  const stockLabel = t(stockStatus === 'restock' ? 'stockRestock' : stockStatus === 'normal' ? 'stockNormal' : 'stockAmple');
  const price = product.price !== '' && product.price !== null && product.price !== undefined ? `<span class="product-price">${escapeHTML(t('pricePrefix'))} ${Number(product.price).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₸</span>` : '';
  const controls = state.profile ? `<div class="card-actions"><button class="card-action edit-product" data-id="${product.id}" aria-label="${escapeHTML(t('editProduct'))} ${escapeHTML(product.number)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16-.7 4.7L8 20l11.3-11.3a2.1 2.1 0 0 0 3-3L5 17Z"></path><path d="m14.8 7.2 2 2"></path></svg></button><button class="card-action delete delete-product" data-id="${product.id}" aria-label="${escapeHTML(t('delete'))} ${escapeHTML(product.number)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"></path></svg></button></div>` : '';
  const notice = state.profile && product.moveNoticeUntil && new Date(product.moveNoticeUntil) > new Date() ? `<div class="move-notice">待移位：${escapeHTML(product.moveNoticeFrom || '请移到新位置')} · ${Math.ceil((new Date(product.moveNoticeUntil) - Date.now()) / 86400000)} 天</div>` : '';
  return `<article id="product-${escapeHTML(product.id)}" class="product-card ${state.highlightId === product.id ? 'is-highlighted' : ''}"><div class="product-image ${product.image ? '' : 'placeholder'}">${image}</div><div class="product-info"><span class="product-location">${escapeHTML(location)}</span><div class="product-heading-row"><h3 class="product-number" title="${escapeHTML(product.number)}">${escapeHTML(product.number)}</h3>${price}</div><p class="product-type">${escapeHTML(product.type)}</p><span class="stock-badge stock-${stockStatus}"><span class="stock-badge-dot" aria-hidden="true"></span>${escapeHTML(stockLabel)}</span><p class="product-details">${escapeHTML(product.details || t('noDetails'))}</p>${notice}<div class="product-card-footer"><span class="product-date">${formatDate(product.updatedAt)}</span>${controls}</div></div></article>`;
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
  if (!canEdit()) { showToast('请先登录；离线时只能查看'); return; }
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
  if (!canEdit()) { showToast('请先登录；离线时只能查看'); return; }
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
  if (!canEdit()) { showToast('请先登录；离线时只能查看'); return; }
  const product = state.products.find((item) => item.id === id);
  if (!product) return;
  if (!window.confirm(t('confirmDelete', { number: product.number }))) return;
  try { await removeRemoteProduct(id); await refreshRemoteData(); showToast('货品已移入回收站'); }
  catch (error) { console.error(error); showToast('删除失败，数据未改变'); }
}

function renderSearchResults() {
  const query = state.query.trim().toLowerCase();
  const panel = $('#searchResults');
  if (!query) { panel.hidden = true; return; }
  const statusRank = { ample: 0, normal: 1, restock: 2 };
  const results = activeProducts().filter((product) => [product.number, product.type, product.price, product.stockStatus, product.details, product.zone, product.floor, floorLabel(product.floor), t(product.stockStatus === 'restock' ? 'stockRestock' : product.stockStatus === 'normal' ? 'stockNormal' : 'stockAmple')].join(' ').toLowerCase().includes(query)).sort((a,b) => statusRank[a.stockStatus] - statusRank[b.stockStatus] || a.floor.localeCompare(b.floor) || a.zone.localeCompare(b.zone)).slice(0, 20);
  panel.innerHTML = results.length ? results.map((product) => `<button class="search-result" data-search-id="${product.id}"><span class="search-result-thumb">${product.image ? `<img src="${product.image}" alt="" />` : escapeHTML(product.zone)}</span><span class="search-result-main"><strong>${escapeHTML(product.number)}</strong><span>${escapeHTML(product.type)} · ${escapeHTML(floorLabel(product.floor))} ${escapeHTML(product.zone)} ${state.language === 'ru' ? 'зона' : state.language === 'kk' ? 'аймағы' : '区'}</span></span></button>`).join('') : `<div class="search-empty">${escapeHTML(t('noResults'))}</div>`;
  panel.hidden = false;
  $$('.search-result').forEach((button) => button.addEventListener('click', () => {
    const product = state.products.find((item) => item.id === button.dataset.searchId);
    if (product) { state.highlightId = product.id; selectZone(product.floor, product.zone); requestAnimationFrame(() => document.getElementById(`product-${product.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })); setTimeout(() => { state.highlightId = null; document.getElementById(`product-${product.id}`)?.classList.remove('is-highlighted'); }, 2800); }
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

function roleLabel(role) { return role === 'owner' ? '主管理员' : role === 'admin' ? '管理员' : '员工'; }
function dateTime(value) { return value ? new Date(value).toLocaleString() : '—'; }

async function openManagement(panel) {
  if (!state.profile) return;
  $('#staffMenuDialog').close();
  const titles = { devices: ['DEVICES', '登录设备'], accounts: ['ACCOUNTS', '账号管理'], trash: ['RECYCLE BIN', '回收站'], audit: ['AUDIT LOG', '操作记录'] };
  $('#managementEyebrow').textContent = titles[panel]?.[0] || 'MANAGEMENT';
  $('#managementTitle').textContent = titles[panel]?.[1] || '管理';
  $('#managementContent').innerHTML = '<div class="panel-loading">正在读取云端数据…</div>';
  $('#managementDialog').showModal();
  try {
    if (panel === 'devices') await renderDevicesPanel();
    if (panel === 'accounts') await renderAccountsPanel();
    if (panel === 'trash') await renderTrashPanel();
    if (panel === 'audit') await renderAuditPanel();
  } catch (error) {
    console.error(error); $('#managementContent').innerHTML = '<div class="panel-empty">读取失败，请检查网络和权限后重试。</div>';
  }
}

async function renderDevicesPanel() {
  const result = await callStaffApi('list_devices'); const devices = result.devices || [];
  $('#managementContent').innerHTML = devices.length ? `<div class="management-list">${devices.map((device) => `<article class="management-row"><div><strong>${escapeHTML(device.device_label || '未命名设备')}</strong><span>${escapeHTML(device.browser_label || '')} · 最近使用 ${escapeHTML(dateTime(device.last_seen_at))}</span></div><button class="secondary-button revoke-device" data-id="${escapeHTML(device.id)}" ${device.revoked_at ? 'disabled' : ''}>${device.revoked_at ? '已撤销' : '撤销信任'}</button></article>`).join('')}</div>` : '<div class="panel-empty">暂无设备记录。</div>';
  $$('.revoke-device').forEach((button) => button.addEventListener('click', async () => { button.disabled = true; try { await callStaffApi('revoke_device', { deviceId: button.dataset.id }); await renderDevicesPanel(); showToast('设备信任已撤销'); } catch { button.disabled = false; showToast('撤销失败'); } }));
}

async function renderAccountsPanel() {
  if (!isAdmin()) throw new Error('forbidden');
  const result = await callStaffApi('list_accounts'); const accounts = result.accounts || [];
  $('#managementContent').innerHTML = `<form id="createAccountForm" class="management-form"><input id="newAccountUsername" required placeholder="登录账号" /><input id="newAccountName" required placeholder="员工姓名" /><input id="newAccountPassword" type="password" minlength="8" required placeholder="临时密码（至少 8 位）" /><select id="newAccountRole"><option value="staff">员工</option>${isOwner() ? '<option value="admin">管理员</option>' : ''}</select><button class="primary-button" type="submit">创建账号</button></form><div class="management-list">${accounts.map((account) => {
    const manageable = account.role !== 'owner' && (isOwner() || account.role === 'staff');
    return `<article class="management-row account-row"><div><strong>${escapeHTML(account.display_name)} <small>${escapeHTML(roleLabel(account.role))}</small></strong><span>${escapeHTML(account.username)} · ${account.is_active && !account.deleted_at ? '启用' : '停用'}${account.locked_until ? ` · 锁定至 ${escapeHTML(dateTime(account.locked_until))}` : ''}</span></div>${manageable ? `<div class="row-actions"><button class="secondary-button account-toggle" data-id="${account.id}" data-active="${account.is_active ? 'false' : 'true'}">${account.is_active ? '停用' : '启用'}</button>${account.locked_until ? `<button class="secondary-button account-unlock" data-id="${account.id}">解锁</button>` : ''}<button class="secondary-button account-reset" data-id="${account.id}">重置密码</button><button class="danger-button account-delete" data-id="${account.id}">删除</button></div>` : ''}</article>`;
  }).join('')}</div>`;
  $('#createAccountForm').addEventListener('submit', async (event) => { event.preventDefault(); try { await callStaffApi('create_account', { username: $('#newAccountUsername').value, displayName: $('#newAccountName').value, password: $('#newAccountPassword').value, role: $('#newAccountRole').value }); await renderAccountsPanel(); showToast('账号已创建'); } catch (error) { showToast(error.code === 'username_exists' ? '登录账号已经存在' : '账号创建失败'); } });
  $$('.account-toggle').forEach((button) => button.addEventListener('click', () => accountAction('set_active', button.dataset.id, { active: button.dataset.active === 'true' })));
  $$('.account-unlock').forEach((button) => button.addEventListener('click', () => accountAction('unlock', button.dataset.id)));
  $$('.account-reset').forEach((button) => button.addEventListener('click', async () => { const password = window.prompt('输入新的临时密码（至少 8 位）'); if (password) await accountAction('reset_password', button.dataset.id, { password }); }));
  $$('.account-delete').forEach((button) => button.addEventListener('click', async () => { if (confirm('删除后账号不能再次使用，确定继续吗？')) await accountAction('delete_account', button.dataset.id); }));
}

async function accountAction(action, userId, extra = {}) { try { await callStaffApi(action, { userId, ...extra }); await renderAccountsPanel(); showToast('账号状态已更新'); } catch { showToast('操作失败，请检查权限'); } }

async function renderTrashPanel() {
  if (!isAdmin()) throw new Error('forbidden');
  const { data, error } = await remoteClient.from('products').select('*').not('deleted_at', 'is', null).order('deleted_at', { ascending: false }); if (error) throw error;
  $('#managementContent').innerHTML = data.length ? `<div class="management-list">${data.map((row) => `<article class="management-row"><div><strong>${escapeHTML(row.number)} · ${escapeHTML(row.floor)} / ${escapeHTML(row.zone)}</strong><span>${escapeHTML(row.type || '')} · 删除于 ${escapeHTML(dateTime(row.deleted_at))}</span></div><button class="primary-button restore-product" data-id="${escapeHTML(row.id)}">恢复</button></article>`).join('')}</div>` : '<div class="panel-empty">回收站为空。</div>';
  $$('.restore-product').forEach((button) => button.addEventListener('click', async () => { try { const { error: restoreError } = await remoteClient.rpc('restore_product', { p_product_id: button.dataset.id, p_floor: null, p_zone: null }); if (restoreError) throw restoreError; await renderTrashPanel(); await refreshRemoteData(); showToast('货品已恢复'); } catch (error) { showToast(error?.code === '23505' ? '原区域已有相同编号，请先处理位置冲突' : '恢复失败'); } }));
}

async function renderAuditPanel() {
  if (!isAdmin()) throw new Error('forbidden');
  const { data, error } = await remoteClient.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(200); if (error) throw error;
  $('#managementContent').innerHTML = data.length ? `<div class="management-list audit-list">${data.map((entry) => `<article class="management-row"><div><strong>${escapeHTML(entry.actor_name || entry.actor_username || '系统')} · ${escapeHTML(entry.action)}</strong><span>${escapeHTML(entry.summary || '')} · ${escapeHTML(dateTime(entry.created_at))}</span></div></article>`).join('')}</div>` : '<div class="panel-empty">暂无操作记录。</div>';
}

function mergeGroups() {
  const groups = new Map(); activeProducts().forEach((product) => { const key = product.number.trim().toLowerCase(); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(product); });
  return [...groups.values()].filter((products) => products.length > 1);
}

function renderMergePanel() {
  const groups = mergeGroups(); $('#mergeTopCount').textContent = groups.length;
  $('#mergeContent').innerHTML = groups.length ? groups.map((products, index) => `<form class="merge-group" data-group="${index}"><div class="merge-heading"><div><strong>${escapeHTML(products[0].number)}</strong><span>${products.length} 个位置可合并</span></div><select class="merge-status"><option value="ample">充裕</option><option value="normal">一般</option><option value="restock">需要补货</option></select></div><p>选择保留位置：</p><div class="merge-locations">${products.map((product, productIndex) => `<label><input type="radio" name="target-${index}" value="${product.id}" ${productIndex === 0 ? 'checked' : ''} /><span><b>${escapeHTML(product.floor)} / ${escapeHTML(product.zone)}</b>${escapeHTML(product.type)}${product.price ? ` · ₸${escapeHTML(product.price)}` : ''}</span></label>`).join('')}</div><p>选择要合并并移入回收站的位置：</p><div class="merge-sources">${products.map((product, productIndex) => `<label><input type="checkbox" value="${product.id}" ${productIndex === 0 ? '' : 'checked'} /><span>${escapeHTML(product.floor)} / ${escapeHTML(product.zone)}</span></label>`).join('')}</div><button class="primary-button" type="submit">确认合并</button></form>`).join('') : '<div class="panel-empty">当前没有可合并的同编号位置。</div>';
  $$('.merge-group').forEach((form) => {
    const syncSources = () => { const target = form.querySelector('input[type="radio"]:checked')?.value; form.querySelectorAll('.merge-sources input').forEach((box) => { box.disabled = box.value === target; if (box.disabled) box.checked = false; }); };
    form.querySelectorAll('input[type="radio"]').forEach((radio) => radio.addEventListener('change', syncSources)); syncSources();
    form.addEventListener('submit', async (event) => { event.preventDefault(); const targetId = form.querySelector('input[type="radio"]:checked')?.value; const sourceIds = [...form.querySelectorAll('.merge-sources input:checked')].map((box) => box.value); if (!sourceIds.length) { showToast('至少选择一个来源位置'); return; } if (!confirm('来源位置将进入回收站，确定合并吗？')) return; try { const { error } = await remoteClient.rpc('merge_product_locations', { p_target_id: targetId, p_source_ids: sourceIds, p_final_status: form.querySelector('.merge-status').value }); if (error) throw error; await refreshRemoteData(); renderMergePanel(); showToast('位置已合并'); } catch { showToast('合并失败，数据没有改变'); } });
  });
}

$('#quickAdd').addEventListener('click', openAdd);
$('#areaAdd').addEventListener('click', openAdd);
$('#emptyAdd').addEventListener('click', openAdd);
$('#exportData').addEventListener('click', exportData);
$('#refreshData').addEventListener('click', handleRefresh);
$('#restockTop')?.addEventListener('click', openRestockCenter);
$('#accountButton')?.addEventListener('click', () => state.profile ? ($('#staffIdentity').textContent = `${state.profile.display_name || state.profile.username} · ${roleLabel(state.profile.role)}`, $('#staffMenuDialog').showModal()) : (resetLoginFlow(), $('#loginDialog').showModal()));
$('#closeLogin')?.addEventListener('click', () => { $('#loginDialog').close(); resetLoginFlow(); });
$('#loginDialog')?.addEventListener('click', (event) => { if (event.target === $('#loginDialog')) { $('#loginDialog').close(); resetLoginFlow(); } });
$('#loginForm')?.addEventListener('submit', handleLogin);
$('#passwordForm')?.addEventListener('submit', changeOwnPassword);
$('#changePassword')?.addEventListener('click', () => { $('#staffMenuDialog').close(); $('#newPassword').value = ''; $('#confirmPassword').value = ''; $('#passwordDialog').showModal(); });
$('#logoutButton')?.addEventListener('click', logout);
$('#closeStaffMenu')?.addEventListener('click', () => $('#staffMenuDialog').close());
$('#staffMenuDialog')?.addEventListener('click', (event) => { if (event.target === $('#staffMenuDialog')) $('#staffMenuDialog').close(); });
$$('[data-open-panel]').forEach((button) => button.addEventListener('click', () => openManagement(button.dataset.openPanel)));
$('#closeManagement')?.addEventListener('click', () => $('#managementDialog').close());
$('#managementDialog')?.addEventListener('click', (event) => { if (event.target === $('#managementDialog')) $('#managementDialog').close(); });
$('#mergeTop')?.addEventListener('click', () => { renderMergePanel(); $('#mergeDialog').showModal(); });
$('#closeMerge')?.addEventListener('click', () => $('#mergeDialog').close());
$('#mergeDialog')?.addEventListener('click', (event) => { if (event.target === $('#mergeDialog')) $('#mergeDialog').close(); });
window.addEventListener('online', async () => { state.online = true; updateAccessUI(); await validateCurrentSession({ notify: true }); await refreshRemoteData(); showToast('网络已恢复，数据已同步'); });
window.addEventListener('offline', () => { state.online = false; updateAccessUI(); renderAll(); showToast('当前离线，只能查看最近缓存'); });
window.addEventListener('focus', () => validateCurrentSession({ notify: true }));
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') validateCurrentSession({ notify: true }); });
function openLocationRules() { renderLocationRules(); $('#locationRulesDialog').showModal(); }
$('#locationRulesDesktop').addEventListener('click', openLocationRules);
$('#closeLocationRules').addEventListener('click', () => $('#locationRulesDialog').close());
$('#locationRulesDialog').addEventListener('click', (event) => { if (event.target === $('#locationRulesDialog')) $('#locationRulesDialog').close(); });
$('#closeRestock')?.addEventListener('click', () => $('#restockDialog').close());
$('#restockDialog')?.addEventListener('click', (event) => { if (event.target === $('#restockDialog')) $('#restockDialog').close(); });
$('#closeDialog').addEventListener('click', () => $('#productDialog').close());
$('#cancelDialog').addEventListener('click', () => $('#productDialog').close());
$('#productDialog').addEventListener('click', (event) => { if (event.target === $('#productDialog')) $('#productDialog').close(); });
$('#productDetails').addEventListener('input', updateDetailCount);
$('#globalSearch').addEventListener('input', (event) => { state.query = event.target.value; $('#clearSearch').hidden = !state.query; renderSearchResults(); });
$('#clearSearch').addEventListener('click', () => { state.query = ''; $('#globalSearch').value = ''; $('#clearSearch').hidden = true; renderSearchResults(); $('#globalSearch').focus(); });
$('#productImage').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const maxSide = 1600; const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      setImagePreview(canvas.toDataURL('image/webp', .82));
    };
    image.onerror = () => { showToast('图片无法读取，请换一张图片'); event.target.value = ''; };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});
$('#removeImage').addEventListener('click', () => { setImagePreview(''); $('#productImage').value = ''; });
$('#languageSelect').addEventListener('change', (event) => {
  state.language = event.target.value;
  localStorage.setItem(LANGUAGE_KEY, state.language);
  const suffix = state.language === 'ru' ? 'Ru' : state.language === 'kk' ? 'Kk' : 'Zh';
  state.products = state.products.map((product) => ({ ...product, type: product[`type${suffix}`] || product.sourceType || product.type, details: product[`details${suffix}`] || product.sourceDetails || product.details }));
  renderAll();
});
$('#productForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!canEdit()) { showToast('请先登录；离线时不能保存'); return; }
  const product = { number: $('#productNumber').value.trim(), type: $('#productType').value.trim(), price: $('#productPrice').value.trim(), stockStatus: document.querySelector('input[name="stockStatus"]:checked')?.value || 'ample', floor: $('#productFloor').value, zone: $('#productZone').value, details: $('#productDetails').value.trim(), image: $('#productImage').dataset.value || '', updatedAt: new Date().toISOString() };
  if (!product.number || !product.type) return;
  const duplicate = activeProducts().find((item) => item.id !== state.editingId && item.floor === product.floor && item.zone === product.zone && item.number.trim().toLowerCase() === product.number.toLowerCase());
  if (duplicate) { showToast(`区域 ${product.zone} 已有编号 ${product.number}`); return; }
  const original = state.editingId ? state.products.find((item) => item.id === state.editingId) : null;
  const moved = Boolean(original && (original.floor !== product.floor || original.zone !== product.zone));
  const savedProduct = original
    ? { ...original, ...product, sourceType: product.type, sourceDetails: product.details, sourceLanguage: state.language, translationStatus: 'pending' }
    : { ...product, sourceType: product.type, sourceDetails: product.details, sourceLanguage: state.language, translationStatus: 'pending', id: crypto.randomUUID() };
  if (moved) savedProduct.id = crypto.randomUUID();
  const submit = $('#saveProduct'); submit.disabled = true;
  try {
    setSyncStatus(t('syncing'), 'busy');
    const syncedProduct = moved ? await moveRemoteProduct(original, savedProduct) : await upsertRemoteProduct(savedProduct);
    requestTranslation(syncedProduct.id);
    state.floor = syncedProduct.floor; state.zone = syncedProduct.zone;
    $('#productDialog').close();
    await refreshRemoteData();
    showToast(moved ? '新位置已建立，旧位置保留 3 天移位提示' : (original ? t('syncedUpdated') : t('syncedAdded')));
  } catch (error) {
    console.error('Supabase save failed', error);
    setSyncStatus(t('connectionFail'), 'error');
    showToast(error?.code === '23505' ? `区域 ${product.zone} 已有相同编号` : '保存失败，云端数据没有改变');
  } finally { submit.disabled = false; }
});

renderAll();
initRemote();
