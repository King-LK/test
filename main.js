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
ClickNumber = 0
NameList = []
Small = 3
Max = 5

function main() {
    toast("开始执行脚本...");
    sleep(2000);
    exit()
    WorkAuto()
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

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

function RndSwiptUP() {
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

function UninstallThisSoftware() {
    if (FindText("确定", true)) {
    } else if (FindText("卸载", true)) {
    } else if (FindText("一键授权")) {
        home()
    } else if (FindText("应用信息", true)) {
    } else if (FindText("热更新授权")) {
        let a = text("热更新授权").getOneNodeInfo(0);
        if (a) {
            a.longClick()
        }
    }
    return "卸载软件"
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

function FindColorS(ColorList) {
    if (!ColorList[4]) {
        ColorList[4] = 0
    }
    if (!ColorList[5]) {
        ColorList[5] = 0
    }
    if (!ColorList[6]) {
        ColorList[6] = 0
    }
    if (!ColorList[7]) {
        ColorList[7] = 0
    }
    if (!ColorList[9]) {
        ColorList[9] = 0.96
    }
    let firstColor = ColorList[2]
    let multiColor = ColorList[3]
    let points = image.findMultiColor(ColorList[1], firstColor, multiColor, ColorList[4], ColorList[5], ColorList[6], ColorList[7], ColorList[8], ColorList[10], ColorList[11]);
    //这玩意是个数组
    if (points && points.length > 0) {
        logd("points " + JSON.stringify(points))
        if (ColorList[9]) {
            if (clickPoint(points[0].x, points[0].y)) {
                toast("点击:" + ColorList[0]);
                return true
            }
        } else {
            toast("找到:" + ColorList[0]);
            return true
        }
    }
    return null
}

function SetZN() {
    if (FindText("Type language name")) {
        let a = text("Type language name").getOneNodeInfo(0);
        if (a) {
            a.inputText("简体中文")
        }
    } else if (FindText("Languages", true) || FindText("Languages & input", true)) {
        let a = text("简体中文（中国）").getOneNodeInfo(0);
        if (a) {
            let b = a.nextSiblings()
            if (b) {
                if (Number(b[0].text) === 2) {
                    touchDown(a.bounds.left + 100, a.bounds.top + 50)
                    sleep(5000);
                    for (let i = 0; i < 3; i++) {
                        touchMove(56, 98 * (i + 1))
                        sleep(1000);
                    }
                    touchUp(56, 294)
                }
            }
        } else if (FindText("Add a language", true)) {
            if (FindText("简体中文（中国）", true)) {
            } else if (FindId("android:id/locale_search_menu", true)) {
            }
        }
    } else if (FindText("Add a language", true)) {
        if (FindText("简体中文（中国）", true)) {
        } else if (FindId("android:id/locale_search_menu", true)) {
        }
    } else if (FindText("简体中文（中国）", true)) {
        if (FindText("添加语言")) {
            toast("返回桌面");
            for (let i = 0; i < 10; i++) {
                back()
                sleep(300);
            }
            return "获取下载链接"
        }
    } else if (FindText("Languages & input", true)) {
    } else if (FindId("com.android.settings:id/settings_homepage_container")) {
        if (FindText("System", true)) {
        } else {
            RndSwipt()
        }
    } else if (FindText("Settings", true)) {
    } else if (FindText("设置")) {
        return "获取下载链接"
    } else {
        back();
        sleep(2000);
        swipeToPoint(200, 1500, 300, 50, 1200)
        sleep(3000);
    }
    return "设置语言"
}

function GetIMEI() {
    if (FindText("IMEI")) {
        let a = text("IMEI").getOneNodeInfo(0);
        if (a) {
            let b = a.nextSiblings()
            if (b) {
                return b[0].text
            }
        }
    } else if (FindText("关于手机", true)) {
    } else if (FindText("搜索设置")) {
        for (let i = 0; i < 5; i++) {
            RndSwiptUP()
            sleep(800)
        }
    } else if (FindText("设置", true)) {
    } else {
        back();
        sleep(2000);
        swipeToPoint(200, 1500, 300, 50, 1200)
        sleep(3000);
    }
    return "获取IMEI"
}

function BFSHS(TemWork) {
    if (FindText("  搜索应用") || FindId("com.google.android.apps.nexuslauncher:id/apps_divider_view")) {
        if (FindText("Magisk") === false && FindDesc("Magisk") === false) {
            swipeToPoint(200, 1500, 300, 50, 600)
            sleep(1000);
            if (FindText("Magisk") === false && FindDesc("Magisk") === false) {
                return "下载面具"
            }
        } else if (FindText("小红书") === false && FindDesc("小红书") === false) {
            swipeToPoint(200, 1500, 300, 50, 600)
            sleep(1000);
            if (FindText("小红书") === false && FindDesc("小红书") === false) {
                return "下载小红书"
            }
        } else if (FindText("数据备份") === false && FindDesc("数据备份") === false) {
            swipeToPoint(200, 1500, 300, 50, 600)
            sleep(1000);
            if (FindText("数据备份") === false && FindDesc("数据备份") === false) {
                return "下载应用备份"
            }
        } else if (FindText("ZArchiver Pro") === false && FindDesc("ZArchiver Pro") === false) {
            swipeToPoint(200, 1500, 300, 50, 600)
            sleep(1000);
            if (FindText("ZArchiver Pro") === false && FindDesc("ZArchiver Pro") === false) {
                return "下载RAR"
            }
        } else if (FindText(TemWork) === false && FindDesc(TemWork) === false) {
            swipeToPoint(200, 1500, 300, 50, 600)
            sleep(1000);
            if (FindText(TemWork) === false && FindDesc(TemWork) === false) {
                return "下载" + TemWork
            }
        } else if (FindText("蓝云") === false && FindDesc("蓝云") === false) {
            swipeToPoint(200, 1500, 300, 50, 600)
            sleep(1000);
            if (FindText("蓝云") === false && FindDesc("蓝云") === false) {
                return "下载蓝云"
            }
        } else if (FindText("Magisk") && FindText("小红书") && FindText(TemWork)) {
            return "打开小红书"
        } else if (FindDesc("Magisk") && FindDesc("小红书") && FindDesc(TemWork)) {
            return "打开小红书"
        }
    } else {
        swipeToPoint(200, 1500, 300, 50, 1200)
    }
    return "判断APP下载"
}

function DownUninstallMJ(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：面具.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("面具.apk", true)
        }
    } else if (FindText("确定", true)) {
    } else if (FindText("下载列表")) {
        FindText("面具.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("面具.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.面具)) {
        //     let a = text(URlJSON.面具).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // }
        // else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.面具)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.面具)
    }
    sleep(2000);
    return "下载面具";
}

function DownUninstallXHS(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：小红书.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("小红书.apk", true)
        }
    } else if (FindText("确定", true)) {
        // while (true) {
        //     if (FindText("下载列表")) {
        //         break
        //     } else if (FindText("下载", true)) {
        //     } else if (FindId("com.mmbox.xbrowser:id/toolbar_btn_menu", true)) {
        //     } else if (FindText("确定", true)) {
        //     }
        //     sleep(2000);
        // }
    } else if (FindText("下载列表")) {
        FindText("小红书.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("小红书.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.小红书)) {
        //     let a = text(URlJSON.小红书).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // } else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.小红书)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.小红书)
    }
    sleep(2000);
    return "下载小红书";

// else if (FindText("x浏览器", true)) {
//         sleep(3000);
//         if (FindText("始终", true)) {
//         }
//     }
}

function DownUninstallHD(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：红豆.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("红豆.apk", true)
        }
    } else if (FindText("确定", true)) {
        // while (true) {
        //     if (FindText("下载列表")) {
        //         break
        //     } else if (FindText("下载", true)) {
        //     } else if (FindId("com.mmbox.xbrowser:id/toolbar_btn_menu", true)) {
        //     } else if (FindText("确定", true)) {
        //     }
        //     sleep(2000);
        // }
    } else if (FindText("下载列表")) {
        FindText("红豆.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("红豆.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.红豆)) {
        //     let a = text(URlJSON.红豆).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // } else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.红豆)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.红豆)
    }
    sleep(2000);
    return "下载红豆";
}

function DownUninstallLY(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：蓝云.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("蓝云.apk", true)
        }
    } else if (FindText("确定", true)) {
        // while (true) {
        //     if (FindText("下载列表")) {
        //         break
        //     } else if (FindText("下载", true)) {
        //     } else if (FindId("com.mmbox.xbrowser:id/toolbar_btn_menu", true)) {
        //     } else if (FindText("确定", true)) {
        //     }
        //     sleep(2000);
        // }
    } else if (FindText("下载列表")) {
        FindText("蓝云.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("蓝云.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.蓝云)) {
        //     let a = text(URlJSON.蓝云).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // } else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.蓝云)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.蓝云)
    }
    sleep(2000);
    return "下载蓝云";
}

function DownUninstallDX(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：大象.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("大象.apk", true)
        }
    } else if (FindText("确定", true)) {
        // while (true) {
        //     if (FindText("下载列表")) {
        //         break
        //     } else if (FindText("下载", true)) {
        //     } else if (FindId("com.mmbox.xbrowser:id/toolbar_btn_menu", true)) {
        //     } else if (FindText("确定", true)) {
        //     }
        //     sleep(2000);
        // }
    } else if (FindText("下载列表")) {
        FindText("大象.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("大象.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.大象)) {
        //     let a = text(URlJSON.大象).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // } else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.大象)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.大象)
    }
    sleep(2000);
    return "下载大象平台";
}

function DownUninstallYYBF(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：备份还原.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("备份还原.apk", true)
        }
    } else if (FindText("确定", true)) {
        // while (true) {
        //     if (FindText("下载列表")) {
        //         break
        //     } else if (FindText("下载", true)) {
        //     } else if (FindId("com.mmbox.xbrowser:id/toolbar_btn_menu", true)) {
        //     } else if (FindText("确定", true)) {
        //     }
        //     sleep(2000);
        // }
    } else if (FindText("下载列表")) {
        FindText("备份还原.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("备份还原.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.应用备份)) {
        //     let a = text(URlJSON.应用备份).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // } else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.应用备份)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.应用备份)
    }
    sleep(2000);
    return "下载应用备份";
}

function DownUninstallRAR(URlJSON) {
    if (FindText("完成", true)) {
        toast("返回桌面");
        for (let i = 0; i < 20; i++) {
            back()
            sleep(300);
        }
        return "判断APP下载"
    } else if (FindText("下一步") || FindText("正在安装...")) {
    } else if (FindTextEX(".*下载“微红热更新.*") || FindText("是否重新下载文件？")) {
        back()
    } else if (FindText("给5星")) {
        FindId("com.mmbox.xbrowser:id/btn_close", true)
    } else if (FindDesc("下载管理程序通知：压缩.apk")) {
        if (swipeToPoint(200, 20, 300, 800, 1200)) {
            sleep(3000);
            FindText("压缩.apk", true)
        }
    } else if (FindText("确定", true)) {
        // while (true) {
        //     if (FindText("下载列表")) {
        //         break
        //     } else if (FindText("下载", true)) {
        //     } else if (FindId("com.mmbox.xbrowser:id/toolbar_btn_menu", true)) {
        //     } else if (FindText("确定", true)) {
        //     }
        //     sleep(2000);
        // }
    } else if (FindText("下载列表")) {
        FindText("压缩.apk", true)
    } else if (FindText("安装", true)) {
    } else if (FindDescEx(".*打开按钮", true)) {
    } else if (FindTextEX("压缩.apk")) {
        if (FindId("submit", true)) {
        } else if (FindText("下载", true)) {
        }
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("Chrome", true)) {
        sleep(3000);
        if (FindText("始终", true)) {
        }
    } else if (FindText("始终", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("验证并下载", true)) {
    } else if (FindText("下载", true)) {
    } else if (FindText("设置", true)) {
    } else if (FindTextEX("正在下载文件") || FindTextEX("正在安装…")) {
    }
        // else if (FindText(URlJSON.RAR)) {
        //     let a = text(URlJSON.RAR).getNodeInfo(0);
        //     if (a) {
        //         for (let i = 0; i < a.length; i++) {
        //             if (a[i].id === "com.android.chrome:id/line_2") {
        //                 logd(a[i].text);
        //                 a[i].clickEx() || a[i].click()
        //             }
        //         }
        //     }
        // } else if (FindText("搜索或输入网址")) {
        //     let a = text("搜索或输入网址").getOneNodeInfo(0);
        //     if (a) {
        //         if (a.inputText(URlJSON.RAR)) {
        //         }
        //     }
    // }
    else {
        // back()
        // sleep(2000);
        // FindText("Chrome", true)
        openUrl(URlJSON.RAR)
    }
    sleep(2000);
    return "下载RAR";
}

function OpenXHS(TemWork) {
    if (FindId("com.xingin.xhs:id/eoi")) {
        let a = id("com.xingin.xhs:id/eoi").getOneNodeInfo(0)
        if (a) {
            if (a.selected === false) {
                a.click()
            } else if (a.selected === true) {
                // home()
                return TemWork
            }
        }
    } else if (FindText("同意", true)) {
    } else if (FindText("小红书", true) || FindDesc("小红书", true)) {
        sleep(6000);
    }
    return "打开小红书"
}

function RegExUrl() {
    //下载链接处理
    try {
        let url = "http://119.23.67.205/"
        let a = http.httpGet(url, "", 10 * 1000, {"User-Agent": "test"});
        // logd(a);
        if (a) {
            let box = /<tr>\s+<td><input .*?\/><\/td>\s+<td>.*?<\/td>\s+<td><a.*?>(.*?)<\/td>\s+<td><\/td>\s+<td><\/td>\s+<td><\/td>\s+<td><\/td>\s+<td><\/td>\s+<td><\/td>\s+<td>(.*?)<\/td>\s+/g;
            let b = a.match(box)
            let c = /href="(.*?)"/g
            let d = /[\u4e00-\u9fa5]+/g
            let g = {}
            for (let i = 0; i < b.length; i++) {
                let e = b[i].match(c)
                let f = b[i].match(d)
                if (e && f) {
                    e = e[0].replace(/href=/g, "")
                    e = e.replace(/"/g, "")
                    f = f[0]
                    if (f === "小红书") {
                        g.小红书 = e
                    } else if (f === "面具") {
                        g.面具 = e
                    } else if (f === "独角兽") {
                        g.独角兽 = e
                    } else if (f === "红豆") {
                        g.红豆 = e
                    } else if (f === "蓝云") {
                        g.蓝云 = e
                    } else if (f === "大象") {
                        g.大象 = e
                    } else if (f === "应用备份") {
                        g.应用备份 = e
                    } else if (f === "压缩") {
                        g.RAR = e
                    }
                }
            }
            if (g) {
                return g
            }
        }
    } catch (e) {
        logd(e);
        sleep(2000);
        return ""
    }
    return ""
}

function LoginDJS(User, Pass) {
    if (FindText("一键授权", true)) {
        for (let i = 0; i < 60; i++) {
            i++
            if (FindText("确定")) {
                return "填资料"
            } else if (FindText("欢迎来到小红书")) {
                return "填资料"
            }
            toast("等待" + i + "/60秒");
            sleep(2000);
        }
        back()
    } else if (FindText("我的收藏", true)) {
        if (FindText("小红书", true)) {
        }
    } else if (FindText("仅在使用该应用时允许", true)) {
        sleep(3000);
    } else if (FindText("扫码")) {
        FindId("com.cm.unicorn:id/group_list_item_imageView", true)
    } else if (FindId("com.cm.unicorn:id/tabSegment")) {
        let a = id("com.cm.unicorn:id/tabSegment").getOneNodeInfo(0)
        if (a) {
            let b = a.child(0)
            if (b) {
                let c = b.child(2)
                if (c) {
                    if (c.clickEx() || c.click()) {
                        sleep(8000);
                    }
                }
            }
        }
    } else if (FindText("登录")) {
        let a = id("com.cm.unicorn:id/username").getOneNodeInfo(0)
        if (a) {
            if (a.inputText(User)) {
                let b = id("com.cm.unicorn:id/password").getOneNodeInfo(0);
                if (b) {
                    if (b.inputText(Pass)) {
                        if (FindText("登录", true)) {
                            sleep(8000);
                        }
                    }
                }
            }

        }
    } else if (FindText("独角兽", true) || FindDesc("独角兽", true)) {
    } else {
        utils.openApp("com.cm.unicorn")
    }
    return "独角兽授权"
}

function LoginDX(User, Pass) {
    if (FindText("一键授权")) {
        return "卸载本软"
        // for (let i = 0; i < 60; i++) {
        //     i++
        //     if (FindText("确定") || FindText("欢迎来到小红书") || FindText("我") || FindText("好久不见，欢迎回来")) {
        //         return "填资料"
        //     }
        //     toast("等待" + i + "/60秒");
        //     sleep(2000);
        // }
        // back()
    } else if (FindText("仅在使用该应用时允许", true)) {
        sleep(3000);
    } else if (FindId("com.cm.elephant:id/tabSegment")) {
        let a = id("com.cm.elephant:id/tabSegment").getOneNodeInfo(0)
        if (a) {
            let b = a.child(0)
            if (b) {
                let c = b.child(2)
                if (c) {
                    if (c.clickEx() || c.click()) {
                        sleep(8000);
                        if (FindText("小红书", true)) {
                        }
                    }
                }
            }
        }
    } else if (FindText("登录")) {
        let a = id("com.cm.elephant:id/username").getOneNodeInfo(0)
        if (a) {
            if (a.inputText(User)) {
                let b = id("com.cm.elephant:id/password").getOneNodeInfo(0);
                if (b) {
                    if (b.inputText(Pass)) {
                        if (FindText("登录", true)) {
                            sleep(8000);
                        }
                    }
                }
            }

        }
    } else if (FindText("独角兽", true) || FindDesc("独角兽", true)) {
    } else {
        utils.openApp("com.cm.elephant")
    }
    return "大象授权"
}

function LoginHD(User, Pass) {
    if (FindText("通道2", true)) {
        for (let i = 0; i < 10; i++) {
            i++
            if (FindText("当前项目已货，请联系管理员")) {
                if (FindText("确定", true)) {
                    sleep(2000);
                    break
                }
            } else if (FindText("确定")) {
                return "填资料"
            } else if (FindText("欢迎来到小红书")) {
                return "填资料"
            }
            toast("等待" + i + "/10秒");
            sleep(2000);
        }

        // if (FindText("通道2", true)) {
        //     for (let i = 0; i < 10; i++) {
        //         i++
        //         if (FindText("当前项目已货，请联系管理员")) {
        //             if (FindText("确定", true)) {
        //                 sleep(2000);
        //                 break
        //             }
        //         } else if (FindText("确定")) {
        //             return "填资料"
        //         } else if (FindText("欢迎来到小红书")) {
        //             return "填资料"
        //         }
        //         toast("等待" + i + "/10秒");
        //         sleep(2000);
        //     }
        // }
    } else if (FindText("我的收藏", true)) {
        if (FindText("小红书", true)) {
        }
    } else if (FindText("仅在使用该应用时允许", true)) {
        sleep(3000);
    } else if (FindId("cn.erkaisi.hongdou:id/find_et")) {
        let a = id("cn.erkaisi.hongdou:id/find_et").getOneNodeInfo(0)
        if (a) {
            if (a.inputText("小红书")) {
                if (FindId("cn.erkaisi.hongdou:id/find_bt", true)) {
                    sleep(2000);
                    let b = id("cn.erkaisi.hongdou:id/appname_tv").getNodeInfo(0);
                    // FindId("cn.erkaisi.hongdou:id/appname_tv", true)
                    if (b) {
                        b[1].clickEx() || b[1].click()
                    }
                }
            }
        }
    } else if (FindText("搜索", true)) {
    } else if (FindId("com.cm.unicorn:id/tabSegment")) {
        let a = id("com.cm.unicorn:id/tabSegment").getOneNodeInfo(0)
        if (a) {
            let b = a.child(0)
            if (b) {
                let c = b.child(2)
                if (c) {
                    if (c.clickEx() || c.click()) {
                        sleep(8000);
                    }
                }
            }
        }
    } else if (FindText("登陆")) {
        let a = id("cn.erkaisi.hongdou:id/user_edit").getOneNodeInfo(0)
        if (a) {
            // if (a.inputText("16607529590")) {User,Pass
            if (a.inputText(User)) {
                let b = id("cn.erkaisi.hongdou:id/pass_edit").getOneNodeInfo(0);
                if (b) {
                    // if (b.inputText("666888")) {
                    if (b.inputText(Pass)) {
                        if (FindText("登陆", true)) {
                            sleep(8000);
                        }
                    }
                }
            }

        }
    } else if (FindText("红豆", true) || FindDesc("红豆", true)) {
    } else {
        utils.openApp("cn.erkaisi.hongdou")
    }
    return "红豆授权"
}

function ChangeNumber() {
    if (FindText("我")) {
        return "养号"
    } else if (FindText("权限使用说明")) {
        clickPoint(204, 1650)
    } else if (FindText("始终允许", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("开始探索小红书", true)) {
    } else if (FindText("好久不见，欢迎回来")) {
        FindText("跳过", true)
    } else if (FindText("选择感兴趣的内容")) {
        let a = text("选择感兴趣的内容").getOneNodeInfo(0);
        if (a) {
            let b = a.parent()
            if (b) {
                let c = b.parent()
                if (c) {
                    let d = c.nextSiblings()
                    if (d) {
                        let e = d[0].allChildren()
                        if (e) {
                            let TemN = 0
                            for (let i = 0; i < e.length; i++) {
                                if (randomNum(0, 1) === 0) {
                                    sleep(1000);
                                    if (e[i].clickEx() || e[i].click()) {
                                        TemN++
                                        sleep(1000);
                                    }
                                    if (TemN > 3) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            FindText("下一步", true)
        }
    } else if (FindText("请完善性别年龄信息") || FindText("请完善年龄信息")) {
        let a = text("请完善性别年龄信息").getOneNodeInfo(0);
        if (!a) {
            a = text("请完善年龄信息").getOneNodeInfo(0);
        }
        if (a) {
            let b = a.previousSiblings()
            if (b) {
                let c = b[1].child(0)
                if (c) {
                    let BOOL = randomNum(0, 1)
                    if (BOOL === 0) {
                        let d = c.child(0)
                        if (d) {
                            d.clickEx() || d.click()
                            sleep(2000);
                        }
                    } else {
                        let d = c.child(1)
                        if (d) {
                            d.clickEx() || d.click()
                            sleep(2000);
                        }
                    }
                    if (FindText("选择你的年龄", true)) {
                        sleep(3000);
                        for (let i = 0; i < randomNum(2, 3); i++) {
                            swipeToPoint(544, randomNum(2300, 2700), 519, 2000, 1200)
                            sleep(2000);
                        }
                        if (FindText("确认", true)) {
                            sleep(3000);
                            FindText("下一步", true)
                        }

                    }
                    FindText("请完善性别年龄信息", true)
                }
            }
        }
    } else if (FindText("选择你的兴趣")) {
        let a = text("选择你的兴趣").getOneNodeInfo(0);
        if (a) {
            let b = a.parent()
            if (b) {
                let c = b.nextSiblings()
                if (c) {
                    let d = c[0].child(0)
                    if (d) {
                        let e = d.child(0)
                        if (e) {
                            let f = e.allChildren()
                            if (f) {
                                let TemN = 0
                                for (let i = 0; i < f.length; i++) {
                                    if (randomNum(0, 1) === 0) {
                                        sleep(1000);
                                        if (f[i].clickEx() || f[i].click()) {
                                            TemN++
                                            sleep(1000);
                                        }
                                        if (TemN > 3) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    } else if (FindText("选择你的性别")) {
        let BOOL = randomNum(0, 1)
        if (BOOL === 0) {
            if (FindText("男生", true)) {
                sleep(2000);
                if (FindText("下一步", true)) {
                    sleep(3000);
                }
            }
        } else {
            if (FindText("女生", true)) {
                sleep(2000);
                if (FindText("下一步", true)) {
                    sleep(3000);
                }
            }
        }
    } else if (FindText("下一步", true)) {
    }
    return "填资料"
}

function Give_Up() {
    try {
        if (FindText("始终允许", true)) {
        } else if (FindText("开启", true)) {
        } else if (FindText("您对小红书的评分如何?")) {
            back()
        } else if (FindText("标记") && FindText("商品")) {
            back()
        } else if (FindText("发弹幕")) {
            let a = id("com.xingin.xhs:id/matrixNickNameView").getOneNodeInfo(0);
            if (a) {
                for (let i = 0; i < NameList.length; i++) {
                    if (NameList[i] === a.text) {
                        back()
                        return "养号"
                    }
                }
                NameList.push(a.text)
                YHNum++
                YHNumber++
                let RndN = randomNum(Small, Max)
                for (let index = 0; index < RndN; index++) {
                    if (FindText("您对小红书的评分如何?")) {
                        back()
                    } else if (FindText("标记") && FindText("商品")) {
                        back()
                    }
                    index++
                    toast("浏览时长:" + index + "/" + RndN)
                    sleep(2000)
                }
            }
            back()
        } else if (FindText("说点什么...")) {
            let a = id("com.xingin.xhs:id/nickNameTV").getOneNodeInfo(0);
            if (a) {
                logd(a.text);
                for (let i = 0; i < NameList.length; i++) {
                    if (NameList[i] === a.text) {
                        back()
                        return "养号"
                    }
                }
                NameList.push(a.text)
                YHNum++
                YHNumber++
                let RndN = randomNum(8, 10)
                for (let i = 0; i < RndN; i++) {
                    logd("浏览时长:" + i + "/" + RndN)
                    if (FindText("您对小红书的评分如何?")) {
                        back()
                    } else if (FindText("标记") && FindText("商品")) {
                        back()
                    }
                    swipeToPoint(800, 1000, 100, 1000, 1200)
                    i++
                    sleep(randomNum(2000, 3000));
                }
                RndN = randomNum(Small, Max)
                for (let index = 0; index < RndN; index++) {
                    if (FindText("您对小红书的评分如何?")) {
                        back()
                    } else if (FindText("标记") && FindText("商品")) {
                        back()
                    }
                    RndSwipt()
                    index++
                    toast("浏览时长:" + index + "/" + RndN)
                    sleep(2000)
                }
            }
            back()
        } else if (FindText("首页")) {
            if (swipeToPoint(500, 200, 530, 1600, 1200)) {
                sleep(3000);
                return "关闭小红书"
            }
        }
    } catch (e) {
        toast(e);
        sleep(2000);
    }
    return "养号"
}

function OpenMJ() {
    if (FindText("超级用户")) {
        return "备份"
    } else if (FindText("Magisk", true)) {
    } else if (FindText("取消", true)) {
    } else {
        back()
    }
    return "打开面具"
}

function Backups() {
    // let 允许2 = ["允许", tmpImage, "#4EAFF5-#101010", "63|-10|#4EAFF5-#101010,-145|-167|#CC0047-#101010,-37|-160|#CC0047-#101010", 0.98, 752, 1595, 1128, 1872, true, 10, 1]
    if (FindText("备份完成")) {
        return "压缩"
    } else if (FindText("完成", true)) {
    } else if (FindText("激活Bashrc环境", true)) {
    } else if (FindText("释放预编译二进制文件", true)) {
    } else if (FindText("获取Root权限", true)) {
        while (true) {
            if (FindText("释放预编译二进制文件", true)) {
                sleep(6000);
                break;
            } else {
                clickPoint(960, 1800)
                logd("没找到");
            }
            sleep(2000);
        }
    } else if (FindText("下一步", true)) {
    } else if (FindText("同意", true)) {
    } else if (FindText("自定义目录")) {
        if (FindText("获取失败")) {
            for (let i = 0; i < 2; i++) {
                back()
                sleep(500);
            }
        }
        let a = text("自定义目录").getOneNodeInfo(0);
        if (a) {
            let b = a.parent()
            if (b) {
                let c = b.previousSiblings()
                if (c) {
                    if (c[0].clickEx() || c[0].click()) {
                        FindText("备份", true)
                    }
                }
            }
        }
    } else if (FindText("准备就绪")) {
        let a = text("准备就绪").getOneNodeInfo(0);
        if (a) {
            let b = a.nextSiblings()
            if (b) {
                b[1].clickEx() || b[1].click()
            }
        }
    } else if (FindText("备份")) {
        if (FindText("选择应用", true)) {

        } else if (FindText("备份", true)) {

        }
    } else if (FindText("数据")) {
        let a = text("应用").getOneNodeInfo(0);
        if (a) {
            if (a.checked) {
                a.clickEx() || a.click()
            } else {
                let b = text("数据").getOneNodeInfo(0);
                if (b) {
                    if (b.checked) {
                        b.clickEx() || b.click()
                    } else {
                        let c = text("小红书").getOneNodeInfo(0);
                        if (c) {
                            let d = c.parent()
                            if (d) {
                                let e = d.parent()
                                if (e) {
                                    let f = e.nextSiblings()
                                    if (f) {
                                        let g = f[0].child(1)
                                        if (g) {
                                            if (g.clickEx() || g.click()) {
                                                back();
                                                sleep(3000);
                                                while (true) {
                                                    if (FindText("数据")) {
                                                        let h = text("数据").getOneNodeInfo(0);
                                                        if (h) {
                                                            let k = h.previousSiblings()
                                                            if (k) {
                                                                if (Number(k[0].text) === 1) {
                                                                    if (FindText("开始备份", true)) {
                                                                        sleep(3000);
                                                                    }
                                                                } else {
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    } else if (FindText("准备就绪")) {
                                                        break;
                                                    }
                                                    sleep(2000);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        utils.openApp("com.xayah.databackup")
    }
    return "备份"
}

function Compress(Device) {
    let re = utils.zip("/sdcard/000/" + Device + ".zip", null, ["/sdcard/DataBackup/"]);
    if (re) {
        return "上传"
    } else {
        return "压缩"
    }
}

function RARCompress(Device) {
    // let re = utils.zip("/sdcard/000/" + Device + ".zip", null, ["/sdcard/DataBackup/"]);
    if (FindText("正在压缩：")) {
        return "上传"
    } else if (FindText("压缩到 *.zip", true)) {
    } else if (FindText("(已选择1项)")) {
        if (FindId("com.rarlab.rar:id/img_more", true)) {
        }
    } else if (FindText("DataBackup")) {
        let a = text("DataBackup").getOneNodeInfo(0);
        if (a) {
            a.longClick()
        }
    } else if (FindId("com.rarlab.rar:id/btnPhoneMemory", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("确定", true)) {
    } else if (FindText("同意", true)) {
    } else {
        utils.openApp("ru.zdevs.zarchiver.pro")
    }
    return "压缩"
}

function CompressUP(LQYUser, LQYPass, Files_Path) {
    if (FindText("正在压缩：")) {
    } else if (FindText("分享直链")) {
        return "修改备份昵称"
    } else if (FindText("DataBackup.zip", true)) {
        sleep(3000);
        while (true) {
            if (FindText("正在上传文件") === false) {
                break;
            } else if (FindText("分享直链")) {
                return "修改备份昵称"
            } else if (FindText("DataBackup.zip", true)) {
            } else if (FindText("继续", true)) {
                sleep(3000);
            }
            sleep(2000);
        }
    } else if (FindText("Zip", true)) {
    } else if (FindText("内部储存", true)) {
    } else if (FindText("上传文件", true)) {
    } else if (FindText("文件夹")) {
        if (FindText(Files_Path, true)) {
            FindDesc("打开或关闭新建菜单", true)
        } else {
            RndSwiptUP()
        }
    } else if (FindText("网页登录", true)) {
    } else if (FindText("其他登录方式", true)) {
    } else if (FindText("关闭应用", true)) {
    } else if (FindId("android:id/switch_widget")) {
        let a = id("android:id/switch_widget").getOneNodeInfo(0);
        if (a) {
            if (a.checked === false) {
                a.clickEx() || a.click()
            } else {
                back()
            }
        }
    } else if (FindText("所有文件访问权限")) {
        let a = text("蓝云").getOneNodeInfo(0);
        if (a) {
            let b = a.nextSiblings()
            if (b) {
                if (b[0].text === "允许") {
                    back()
                } else if (b[0].text === "不允许") {
                    b[0].clickEx() || b[0].click()
                }
            }
        }
    } else if (FindText("仅在使用该应用时允许", true)) {
    } else if (FindText("允许", true)) {
    } else if (FindText("点击授予", true)) {
    } else if (FindText("我已阅读并同意以上所有内容")) {
        let a = text("我已阅读并同意以上所有内容").getOneNodeInfo(0);
        if (a) {
            let b = a.parent()
            if (b) {
                let c = b.nextSiblings()
                if (c) {
                    if (c[0].checked === false) {
                        c[0].clickEx() || c[0].click()
                    } else {
                        FindText("开始使用", true)
                    }
                }
            }
        }
    } else if (FindText("继续使用网页版", true)) {
    } else if (FindId("nc_1_n1z")) {
        let a = id("nc_1_n1z").getOneNodeInfo(0)
        if (a) {
            let b = id("nc_1__scale_text").getOneNodeInfo(0);
            if (b) {
                if (swipeToPoint(a.bounds.left + 20, a.bounds.top + 20, b.bounds.right, a.bounds.bottom, randomNum(500, 600))) {
                    sleep(6000);
                }
            }
        }
    } else if (FindText("登 录")) {
        let a = id("username").getOneNodeInfo(0);
        if (a) {
            if (a.inputText(LQYUser)) {
                let b = a.parent()
                if (b) {
                    let c = b.nextSiblings()
                    if (c) {
                        let d = c[0].child(0)
                        if (d) {
                            if (d.inputText(LQYPass)) {
                                let e = id("SM_BTN_1").getOneNodeInfo(0);
                                if (e) {
                                    let f = e.child(0)
                                    if (f) {
                                        if (FindId("rectMask", true)) {
                                            sleep(6000);
                                            if (FindId("nc_1_n1z")) {
                                            } else if (FindText("登 录", true)) {
                                                sleep(6000);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (FindText("刷新", true)) {
    } else {
        let a = text("已授予").getNodeInfo(0);
        if (a) {
            if (a.length > 2) {
                let b = id("com.tooyoung.lanzou:id/design_bottom_sheet").getOneNodeInfo(0);
                if (b) {
                    swipeToPoint(b.bounds.left + 20, b.bounds.top + 20, b.bounds.right, b.bounds.bottom, 1200)
                }
            }
        } else {
            back()
            utils.openApp("com.tooyoung.lanzou")
            sleep(3000);
        }
    }
    return "上传"
}

function ModifyNickName(TimeName) {
    if (FindText(TimeName + ".zip")) {
        return "重置手机"
    } else if (FindText("分享直链")) {
        back()
    } else if (FindText("DataBackup")) {
        let a = text("DataBackup").getOneNodeInfo(0);
        if (a) {
            if (a.inputText(TimeName)) {
                FindText("确定", true)
            }
        }
    } else if (FindText("修改资料", true)) {
    } else if (FindText("DataBackup.zip")) {
        let a = text("DataBackup.zip").getOneNodeInfo(0);
        if (a) {
            let b = a.parent()
            if (b) {
                let c = b.nextSiblings()
                if (c && c[1]) {
                    c[1].clickEx() || c[1].click()
                }
            }
        }
    }
    return "修改备份昵称"
}

function ResetPhone() {
    if (FindText("清除所有数据", true)) {
    } else if (FindText("系统 > 重置选项", true)) {
    } else if (FindText("清除所有数据（恢复出厂设置）", true)) {
    } else if (FindText("搜索设置", true)) {
        sleep(2000);
        let a = text("搜索设置").getOneNodeInfo(0);
        if (a) {
            a.inputText("清除所有数据（恢复出厂设置）")
        }
    } else if (FindText("设置", true)) {
    } else {
        utils.openApp("com.android.settings")
        sleep(3000);
    }
    return "重置手机"
}

function GetUserPass(imie) {
    let url = "http://119.3.169.36:82/xiaohongshu/dev/account";
    let pa = {
        "imie": imie,
        "plat": "1"
    }
    let x = http.httpPost(url, pa, null, 30 * 1000, {"User-Agent": "json"});
    let json = JSON.parse(x)
    if (json) {
        if (json.code === 200) {
            return json.data
        } else if (json.code === 50) {
            toast(json.message);
            sleep(2000);
        } else {
            toast(x);
            sleep(2000);
        }
    }
    return ""
}

function UPUserState(imie, ID) {
    let url = "http://119.3.169.36:82/xiaohongshu/dev/incAccount";
    let pa = {
        "imie": imie,
        "id": ID
    }
    let x = http.httpPost(url, pa, null, 30 * 1000, {"User-Agent": "json"});
    let json = JSON.parse(x)
    if (json) {
        if (json.code === 200) {
            return true
        } else if (json.code === 50) {
            toast(json.message);
            sleep(2000);
        } else {
            toast(x);
            sleep(2000);
        }
    }
    return false
}


function WorkAuto() {
    let Device = ""
    let SetName = "com.android.settings"
    let AppName = "小红书"
    let PKGName = "com.xingin.xhs"
    let Task = "设置语言"
    let JSONS = {}
    let TemWork = ""
    let DJSUser = "l880820"
    let DJSPass = "l880820"
    let LQYUser = "15827328375"
    let LQYPass = "qwe123456"
    let Files_Path = ""
    let TimeName = 0
    let PKGNames = "com.rgxsq"
    let TemList = []
    let ID = ""

    while (true) {
        if (Task === "设置语言") {
            Task = SetZN()
            if (Task === "获取下载链接") {
                Task = "获取IMEI"
            }
        } else if (Task === "获取IMEI") {
            Task = GetIMEI()
            if (Task !== "获取IMEI") {
                home()
                Device = Task
                toast("IMEI:" + Device);
                sleep(2000);
                Task = "获取下载链接"
            }
        } else if (Task === "获取下载链接") {
            JSONS = RegExUrl()
            if (JSONS) {
                if (JSONS.独角兽) {
                    TemWork = "独角兽"
                    Task = "判断APP下载"
                } else if (JSONS.红豆) {
                    TemWork = "红豆授权"
                    Task = "判断APP下载"
                } else if (JSONS.大象) {
                    TemWork = "大象平台"
                    Task = "判断APP下载"
                }
            }
        } else if (Task === "判断APP下载") {
            Task = BFSHS(TemWork)
            if (Task === "打开小红书") {
                if (JSONS.独角兽) {
                    Task = "获取账号密码"
                } else if (JSONS.红豆) {
                    Task = "获取账号密码"
                } else if (JSONS.大象) {
                    Task = "获取账号密码"
                }
            }
        } else if (Task === "下载面具") {
            if (JSONS.面具) {
                Task = DownUninstallMJ(JSONS)
            }
        } else if (Task === "下载小红书") {
            if (JSONS.小红书) {
                Task = DownUninstallXHS(JSONS)
            }
        } else if (Task === "下载蓝云") {
            if (JSONS.蓝云) {
                Task = DownUninstallLY(JSONS)
            }
        } else if (Task === "下载独角兽") {
            if (JSONS.独角兽) {
                Task = DownUninstallDJS(JSONS)
            }
        } else if (Task === "下载红豆授权") {
            if (JSONS.红豆) {
                Task = DownUninstallHD(JSONS)
            }
        } else if (Task === "下载大象平台") {
            if (JSONS.大象) {
                Task = DownUninstallDX(JSONS)
            }
        } else if (Task === "下载应用备份") {
            if (JSONS.应用备份) {
                Task = DownUninstallYYBF(JSONS)
            }
        } else if (Task === "下载RAR") {
            if (JSONS.RAR) {
                Task = DownUninstallRAR(JSONS)
            }
        } else if (Task === "打开小红书") {
            Task = OpenXHS(TemWork)
            if (Task === TemWork) {
                if (TemWork === "独角兽") {
                    Task = "获取账号密码"
                } else if (TemWork === "红豆授权") {
                    Task = "获取账号密码"
                } else if (TemWork === "大象平台") {
                    Task = "获取账号密码"
                }
            }
        } else if (Task === "获取账号密码") {
            Task = GetUserPass(Device)
            if (Task && Task !== "") {
                TemList = Task.username.split("----")
                if (TemList.length > 1) {
                    ID = Task.id
                    DJSUser = TemList[0]
                    DJSPass = TemList[1]
                    if (TemWork === "独角兽") {
                        Task = "独角兽授权"
                    } else if (TemWork === "红豆授权") {
                        Task = "红豆授权"
                    } else if (TemWork === "大象平台") {
                        Task = "大象授权"
                    }
                } else {
                    toast(Task);
                    Task = "获取账号密码"
                    sleep(2000);
                }
            } else {
                Task = "获取账号密码"
            }
        } else if (Task === "独角兽授权") {
            Task = LoginDJS(DJSUser, DJSPass)
        } else if (Task === "红豆授权") {
            Task = LoginHD(DJSUser, DJSPass)
        } else if (Task === "大象授权") {
            Task = LoginDX(DJSUser, DJSPass)
        } else if (Task === "填资料") {
            Task = ChangeNumber()
        } else if (Task === "养号") {
            Task = Give_Up()
        } else if (Task === "关闭小红书") {
            Task = CloseApp(SetName, AppName, PKGName)
            if (Task === "关闭APP") {
                Task = "关闭小红书"
            } else if (Task === "启动APP") {
                Task = "备份"
                // Task = "打开面具"
            }
        } else if (Task === "打开面具") {
            Task = OpenMJ()
        } else if (Task === "备份") {
            Task = Backups()
        } else if (Task === "压缩") {
            Task = RARCompress(Device)
        } else if (Task === "上传") {
            Task = CompressUP(LQYUser, LQYPass, Files_Path)
            TimeName = time()
        } else if (Task === "修改备份昵称") {
            Task = ModifyNickName(TimeName)
        } else if (Task === "重置手机") {
            Task = ResetPhone()
        } else if (Task === "卸载本软") {
            UninstallThisSoftware(PKGNames)
        } else if (Task === "停止") {
            break;
        }
        toast(Task);
        sleep(2000);
    }
    exit()
}

main();


