/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */
w = device.getScreenWidth();
h = device.getScreenHeight()


// function main() {
//     //开始再这里编写代码了！！
//     // let user = readConfigString("name");
//     // let OK = readConfigString("sing");
//     //如果自动化服务正常
//     // if (!autoServiceStart(3)) {
//     //     logd("自动化服务启动失败，无法执行脚本")
//     //     exit();
//     //     return;
//     // }
//     toast("开始执行脚本...");
//     home();
//     Work()
//
// }

function autoServiceStart(time) {
    for (var i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        var started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function openUrl(url) {
    utils.openActivity({
        action: "android.intent.action.VIEW",
        uri: url,
    })
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
        default:
            return 0;
    }
}

function RndSwipt() {
    let x1 = randomNum(Math.round(w / 2) - 10, Math.round(w / 2) + 10)
    let y1 = randomNum(Math.round(h / 1.2) - 10, Math.round(h / 1.2) + 10)
    let x2 = randomNum(Math.round(w / 3) - 10, Math.round(w / 3) + 10)
    let y2 = randomNum(Math.round(h / 2) - 10, Math.round(h / 2) + 10)
    swipeToPoint(x1, y1, x2, y2, 1200)
}


function OpenSet(PkgName) {
    importClass(android.content.Intent);
    importClass(android.net.Uri)
    let intent = new Intent();
    intent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
    intent.setData(Uri.parse("package:" + PkgName))
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    try {
        context.startActivity(intent);
    } catch (e) {
        loge(e)
    }
}

function CloseApp(SetName, AppName, PkgName) {
    if (FindText("确定", true)) {
    } else if (FindText("强行停止")) {
        let b = text(AppName).getOneNodeInfo(0)
        if (b) {
            let a = text("强行停止").enabled(false).getOneNodeInfo(0)
            if (a) {
                toast("空数据");
                return "启动APP"
            } else {
                toast("有数据");
                for (let i = 0; i < 3; i++) {
                    FindText("强行停止", true)
                    sleep(2000);
                }
            }
        } else {
            back();
        }
    } else if (FindText("删除数据")) {
        back();
    } else if (FindText(AppName) && FindId("android:id/title", true)) {
    } else if (FindText("搜索应用", true)) {
        sleep(2000);
        FindText("搜索应用", false, true, 2000, AppName)
    } else if (FindDesc("删除查询", true)) {
    } else if (FindText("搜索设置项", true)) {
        sleep(2000);
        FindText("搜索设置项", false, true, 2000, "应用")
        sleep(2000);
        FindText("应用管理", true)
    } else {
        OpenSet(PkgName)
    }
    return "关闭APP"
}

function FindText(str, tap, inp, time, strText) {
    let a = text(str).getOneNodeInfo(0)
    if (a) {
        if (tap && inp) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                sleep(time);
                if (a.inputText(strText)) {
                    toast("输入:" + strText);
                    return true
                }
            }
        } else if (inp) {
            if (a.inputText(strText)) {
                toast("输入:" + strText);
                return true
            }
        } else if (tap) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                return true
            }
        } else {
            toast("找到:" + str);
            return true
        }
    }
    return false
}

function FindId(str, tap, inp, time, strText) {
    let a = id(str).getOneNodeInfo(0)
    if (a) {
        if (tap && inp) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                sleep(time);
                if (a.inputText(strText)) {
                    toast("输入:" + strText);
                    return true
                }
            }
        } else if (inp) {
            if (a.inputText(strText)) {
                toast("输入:" + strText);
                return true
            }
        } else if (tap) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                return true
            }
        } else {
            toast("找到:" + str);
            return true
        }
    }
    return false
}

function FindTextEX(str, tap, inp, time, strText) {
    let a = textMatch(str).getOneNodeInfo(0)
    if (a) {
        if (tap && inp) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                sleep(time);
                if (a.inputText(strText)) {
                    toast("输入:" + strText);
                    return true
                }
            }
        } else if (inp) {
            if (a.inputText(strText)) {
                toast("输入:" + strText);
                return true
            }
        } else if (tap) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                return true
            }
        } else {
            toast("找到:" + str);
            return true
        }
    }
    return false
}

function FindDesc(str, tap, inp, time, strText) {
    let a = desc(str).getOneNodeInfo(0)
    if (a) {
        if (tap && inp) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                sleep(time);
                if (a.inputText(strText)) {
                    toast("输入:" + strText);
                    return true
                }
            }
        } else if (inp) {
            if (a.inputText(strText)) {
                toast("输入:" + strText);
                return true
            }
        } else if (tap) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                return true
            }
        } else {
            toast("找到:" + str);
            return true
        }
    }
    return false
}

function FindDescEx(str, tap, inp, time, strText) {
    let a = descMatch(str).getOneNodeInfo(0)
    if (a) {
        if (tap && inp) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                sleep(time);
                if (a.inputText(strText)) {
                    toast("输入:" + strText);
                    return true
                }
            }
        } else if (inp) {
            if (a.inputText(strText)) {
                toast("输入:" + strText);
                return true
            }
        } else if (tap) {
            if (a.clickEx() || a.click()) {
                toast("点击:" + str);
                return true
            }
        } else {
            toast("找到:" + str);
            return true
        }
    }
    return false
}

function GetUID(name) {
    //下载链接处理
    try {
        let url = "http://47.109.28.52:10086/Job/getUidListByName?name=" + name
        let a = http.httpGet(url, "", 10 * 1000, {"User-Agent": "test"});
        if (a) {
            let json = JSON.parse(a)
            if (json && json.msg && json.msg === "ok") {
                return json.data
            }
        }
    } catch (e) {
        logd(e);
        sleep(2000);
        return ""
    }
    return ""
}

function GetUser(name) {
    //下载链接处理
    try {
        let url = "http://47.109.28.52:10086/account/getOne"
        let data = { "name": name }
        let a = http.httpPost(url, data, null,10 * 1000, {"User-Agent": "test"});
        if (a) {
            let json = JSON.parse(a)
            if (json && json.msg && json.msg === "ok") {
                return json.data
            }
        }
    } catch (e) {
        logd(e);
        sleep(2000);
        return ""
    }
    return ""
}

function AJS(USER,PASS){
    // com.fvcorp.android.aijiasuclient
    if (FindText("确定",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/textButton",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/transition_step",true)) {
    } else  if (FindText("收藏")) {
        let a = id("com.fvcorp.android.aijiasuclient:id/listViewAll");
        if (a) {
            if (clickRandom(a)) {
                sleep(10*1000);
            }
        }
    } else if (FindText("以后再说",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/textButton",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/transition_step",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/buttonNegative",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/buttonLogin")) {
        let a = id("com.fvcorp.android.aijiasuclient:id/textAccountName").getOneNodeInfo(0);
        if (a) {
            if (a.inputText(USER)) {
                let b = id("com.fvcorp.android.aijiasuclient:id/textPassword").getOneNodeInfo(0);
                if (b) {
                    if (b.inputText(PASS)) {
                        if (FindId("com.fvcorp.android.aijiasuclient:id/buttonLogin",true)) {
                            sleep(10*1000);
                        }
                    }
                }
            }
        }
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/buttonHaveAccount",true)) {
    } else if (FindText("立即体验",true)) {
    } else if (FindText("立即体验",true)) {
    } else if (FindText("同意",true)) {
    } else if (FindId("com.fvcorp.android.aijiasuclient:id/textCurrentServerTitle")) {
        let a = id("com.fvcorp.android.aijiasuclient:id/textCurrentServerTitle").getOneNodeInfo(0);
        if (a && a.text !== "") {
            return "小红书操作"
        }
    } else {utils.openApp("com.fvcorp.android.aijiasuclient");}
    return "VPN操作"
}

function RedBook(UID,KG){
    if (FindText("发弹幕")) {
        if (KG === "true") {
            for (let i = 0; i < randomNum(45,60); i++) {
                toast("随机看视频，时间：" + String(i * 2) + "秒");
                sleep(2000);
            }
            for (let i = 0; i < 10; i++) {
                let a = id("com.xingin.xhs:id/likeLayout").getOneNodeInfo(0).child(0);
                if (a) {
                    if (a.selected) {
                        return "返回主页"
                    } else{
                        a.clickEx()||a.click()
                    }
                }
                sleep(2000);
            }
            for (let i = 0; i < randomNum(45,60); i++) {
                toast("随机看视频，时间：" + String(i * 2) + "秒");
                sleep(2000);
            }
        }
    } else if (FindText("说点什么...")) {
        if (KG === "true") {
            for (let i = 0; i < randomNum(5, 7); i++) {
                swipeToPoint(1390, 360, 0, 1000, 1200)
                sleep(randomNum(1200, 2000));
            }
            for (let i = 0; i < randomNum(8, 10); i++) {
                RndSwipt()
                sleep(randomNum(1200, 2000));
            }
            for (let i = 0; i < 10; i++) {
                let a = text("说点什么...").getOneNodeInfo(0).nextSiblings()[0].child(0);
                if (a) {
                    if (a.selected) {
                        return "返回主页"
                    } else {
                        a.clickEx() || a.click()
                    }
                }
                sleep(2000);
            }
        }
    }else if (FindText("首页")) {
        Jump_XHS_Works(UID)
    } else {
        utils.openApp("com.xingin.xhs")
        for (let i = 0; i < randomNum(8,10); i++) {
            toast("休息时间:" + String(i * 2) + "秒");
            sleep(2000);
        }
    }
    return "小红书操作"
}

function Jump_XHS_Works(UID) {
    let a = {
        "uri": "xhsdiscover://item/" + UID
    };
    return utils.openActivity(a)
}

function BackHome(){
    if (FindText("首页")) {
        return true;
    }else{
        back();
        return false;
    }
}

function LookNew(){
    if (FindText("发弹幕")) {
        for (let i = 0; i < randomNum(45,60); i++) {
            toast("随机看视频，时间：" + String(i * 2) + "秒");
            sleep(2000);
        }
        for (let i = 0; i < 10; i++) {
            let a = id("com.xingin.xhs:id/likeLayout").getOneNodeInfo(0).child(0);
            if (a) {
                if (a.selected) {
                    return "随机点赞完"
                } else{
                    a.clickEx()||a.click()
                }
            }
            sleep(2000);
        }
    } else if (FindText("说点什么...")) {
        for (let i = 0; i < randomNum(5, 7); i++) {
            swipeToPoint(1390, 360, 0, 1000, 1200)
            sleep(randomNum(1200, 2000));
        }
        for (let i = 0; i < randomNum(8, 10); i++) {
            RndSwipt()
            sleep(randomNum(1200, 2000));
        }
        for (let i = 0; i < randomNum(45,60); i++) {
            toast("随机看视频，时间：" + + String(i * 2) + "秒");
            sleep(2000);
        }
        for (let i = 0; i < 10; i++) {
            let a = text("说点什么...").getOneNodeInfo(0).nextSiblings()[0].child(0);
            if (a) {
                if (a.selected) {
                    return "随机点赞完"
                } else {
                    a.clickEx() || a.click()
                }
            }
            sleep(2000);
        }
    } else if (FindId("com.xingin.xhs:id/gqb")) {
        let a = id("com.xingin.xhs:id/gqb").getNodeInfo(0)
        let Bool = false;
        for (let i = 0; i < a.length; i++) {
            logd(a[i].text);
            if (a[i].text && a[i].text.indexOf("万") > -1) {
                let b = a[i].parent().parent()
                if (b && b.clickEx()|| b && b.click()) {
                    Bool = true;
                    break;
                }
            }
        }
        if (Bool === false) {
            RndSwipt()
        }
    }
    return "随机点赞"
}

function UninstallThisSoftware(NameAPP) {
    if (FindText("确定", true)) {
    } else if (FindText("卸载", true)) {
    } else if (FindText("一键授权")) {
        home()
    } else if (FindText("应用信息", true)) {
    } else if (FindText(NameAPP)) {
        let a = text(NameAPP).getOneNodeInfo(0);
        if (a) {
            a.longClick()
        }
    }
    return "卸载软件"
}

function Work(){
    let Task = "获取UID"
    let Name = readConfigString("name");
    let Name2 = readConfigString("name2");
    let USER = ""
    let PASS = ""
    let UIDList = []
    let UIDList2 = []
    let UID = ""
    let kg = readConfigString("sing");
    let UIDkg = readConfigString("UIDkg");

    // if (UIDkg === "true") {
    //     Task = "获取UID"
    // } else {
    //     if (kg === "true") {Task = "VPN操作"} else {Task = "小红书操作"}
    // }
    logd(Name);
    logd(Name2);
    while (true){
        if (Task === "获取UID") {
            UIDList = GetUID(Name)
            if (UIDList) {
                UID = UIDList[randomNum(0,UIDList.length - 1)]
                UIDList.remove(UID)
                if (kg === "true") {
                    Task = "获取账户"
                } else if (kg === "false") {
                    Task = "小红书操作"
                }
                toast(UID);
                sleep(2000);
            }
        } else if (Task === "获取账户") {
            UIDList2 = GetUser(Name2)
            if (UIDList2) {
                USER = UIDList2.user;
                PASS = UIDList2.pwd;
                Task = "VPN操作"
            }
        } else if (Task === "VPN操作") {
            Task = AJS(USER,PASS)
        } else if (Task === "小红书操作") {
            Task = RedBook(UID, UIDkg)
        } else if (Task === "返回主页") {
            if (BackHome()) {
                Task = "随机点赞"
            }
        } else if (Task === "随机点赞") {
            Task = LookNew()
            if (Task === "随机点赞完") {
                if (UIDList.length <= 0) {
                    Task = "卸载本软"
                } else {

                }
                UID = UIDList[randomNum(0,UIDList.length - 1)]
                UIDList.remove(UID)
            }
        } else if (Task === "卸载本软") {
            if (UninstallThisSoftware("红薯订单热更")) {
                Task = "跳出"
            }
        } else if (Task === "跳出") {
            break;
        }
        toast(Task);
        sleep(2000);
    }
}

Work()
// main();
