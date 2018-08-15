angular
  .module("myApp")
  
  .constant("types", {
    0: "首页banner",
    1: "找职位banner",
    2: "找精英banner",
    3: "行业大图"
  })

  .constant("states", {
    2: "草稿",
    1: "上线"
  })
  .constant("upLowerLine", {
    1: "下线",
    2: "上线"
  })
  .constant("personalStates", {
    上线: 2,
    下线: 1
  })
  .constant("industries", {
    0: "移动互联网",
    1: "电子商务",
    2: "企业服务",
    3: "O2O",
    4: "教育",
    5: "金融",
    6: "保险"
  });

