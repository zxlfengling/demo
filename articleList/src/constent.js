/**
 * Created by zxl on 2018/8/6.
 */
//app.constant("typeName", {
//    0: "首页banner",
//    1: "找职位banner",
//    2: "找精英banner",
//    3: "行业大图"
//})
app.constant("typeName",[
    { "id": 0, "type": "首页banner" },
    { "id": 1, "type": "找职位banner" },
    { "id": 2, "type": "找精英banner" },
    { "id": 3, "type": "行业大图" }
    ]
)
    .constant("typeStates",[
        { "id": 1, "type": "草稿" },
        { "id": 2, "type": "上线" },
    ])
.constant("typeIndustry",[
        { "id": 0, "type": "移动互联网" },
        { "id": 1, "type": "电子商务" },
        { "id": 2, "type": "企业服务" },
        { "id": 3, "type": "O2O" },
        { "id": 4, "type": "教育" },
        { "id": 5, "type": "金融" },
        { "id": 6, "type": "游戏" }
    ]
)

    //.constant("typeIndustry",{
    // 0:"移动互联网",
    // 1:"电子商务",
    // 2:"企业服务",
    // 3:"O2O",
    // 4:"教育",
    // 5:"金融",
    // 6:"游戏"
    //})