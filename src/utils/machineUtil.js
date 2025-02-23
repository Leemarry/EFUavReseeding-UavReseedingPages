export default {
    // 浏览器信息
    browserInfo() {
        try {
            var userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）  
            var userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform  
            var systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）
            var info = "";
            info += "浏览器： " + userAgent;
            // info += "浏览器： " + userAgent + "<br />";
            // info += "操作系统语言： " + userLanguage + "<br />";
            // info += "操作系统支持的默认语言： " + systemLanguage + "<br />";
            return info
        } catch (error) {
            console.log('获取代理信息失败：', error)
            return ''
        }
    },
    test() {
        var os = require("os");
        return os.cpus()
    },
    //CPU信息
    CpuInfo() {
        // OS 是获取的浏览器的对象的属性
        var os = require("os");
        console.log('cpus: ' + os.cpus())
        return os.cpus();
        // var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        // var service = locator.ConnectServer(".");
        // var properties = service.ExecQuery("SELECT * FROM Win32_Processor");
        // var e = new Enumerator(properties);
        // var info = "<table border=1>";
        // info += "<tr  bgcolor='#CDEDED' style='font-weight: bold;' ><td width='450' >CPU 信息</td></tr>";
        // for (; !e.atEnd(); e.moveNext()) {
        //     var p = e.item();
        //     info += "<tr style='color: red'><td >CPU序列号:" + p.ProcessorID + "</td></tr>";
        //     info += "<tr><td >" + p.Caption + "</td></tr>";
        //     info += "<tr><td >CPU编号：" + p.DeviceID + "</td></tr>";
        //     info += "<tr><td >CPU型号：" + p.Name + "</td></tr>";
        //     info += "<tr><td >CPU状态：" + p.CpuStatus + "</td></tr>";
        //     info += "<tr><td >CPU可用性：" + p.Availability + "</td></tr>";
        //     info += "<tr><td >CUP Level：" + p.Level + "</td></tr>";
        //     info += "<tr><td >主机名称：" + p.SystemName + "</td></tr>";
        //     info += "<tr><td >Processor Type：" + p.ProcessorType + "</td></tr>";
        // }
        // info += "</table>";
        // return info;
    },

    //主板信息
    MainBoard() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_BaseBoard");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;'><td width='450'>主板信息 </td></tr>";
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();
            info += "<tr style='color: red'><td >主板ID：" + p.SerialNumber + "</td></tr>";
            info += "<tr><td >" + p.HostingBoard + "</td></tr>";
            info += "<tr><td >制造商：" + p.Manufacturer + "</td></tr>";
            info += "<tr><td >是否开启：" + p.PoweredOn + "</td></tr>";
            info += "<tr><td >型号：" + p.Product + "</td></tr>";
            info += "<tr><td >版本：" + p.Version + "</td></tr>";
        }
        info += "</table>";
        return info;
    },

    //Ram信息  
    RamInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var system = new Enumerator(service.ExecQuery("SELECT * FROM Win32_ComputerSystem")).item();
        var physicMenCap = Math.ceil(system.TotalPhysicalMemory / 1024 / 1024);
        //内存信息   
        var memory = new Enumerator(service.ExecQuery("SELECT * FROM Win32_PhysicalMemory"));
        for (var mem = [], i = 0; !memory.atEnd(); memory.moveNext()) {
            mem[i++] = { cap: memory.item().Capacity / 1024 / 1024, speed: memory.item().Speed };
        }
    },

    //网络连接信息  
    IpInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration Where IPEnabled=TRUE");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;' ><td width='450'>网络连接信息：</td></tr>";
        var i = 1;
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();
            info += "<tr style='color: red'><td >MAC地址" + i + "：" + p.MACAddress + "</td></tr>";
            info += "<tr style='color: red'><td >IP地址" + i + "：" + p.IPAddress(0) + "</td></tr>";
            i++;
        }
        info += "</table>";
        return info;
    },

    // 操作系统信息
    OsInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_OperatingSystem");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;' ><td width='450'>OS信息：</td></tr>";
        var i = 1;
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();
            info += "<tr style='color: red'><td > " + p.BootDevice + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.BuildNumber + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.BuildType + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Caption + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CodeSet + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CountryCode + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CreationClassName + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CSCreationClassName + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CSDVersion + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CSName + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.CurrentTimeZone + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.DataExecutionPrevention_Available + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.DataExecutionPrevention_32BitApplications + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.DataExecutionPrevention_Drivers + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.DataExecutionPrevention_SupportPolicy + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Debug + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Description + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Distributed + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.EncryptionLevel + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.ForegroundApplicationBoost + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.FreePhysicalMemory + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.FreeSpaceInPagingFiles + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.FreeVirtualMemory + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.InstallDate + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.LargeSystemCache + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.LastBootUpTime + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.LocalDateTime + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Locale + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Manufacturer + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.MaxNumberOfProcesses + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.MaxProcessMemorySize + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Name + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.NumberOfLicensedUsers + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.NumberOfProcesses + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.NumberOfUsers + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.OperatingSystemSKU + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Organization + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.OSArchitecture + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.OSLanguage + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.OSProductSuite + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.OSType + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.OtherTypeDescription + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.PAEEnabled + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.PlusProductID + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.PlusVersionNumber + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.PortableOperatingSystem + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Primary + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.ProductType + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.RegisteredUser + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.SerialNumber + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.ServicePackMajorVersion + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.ServicePackMinorVersion + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.SizeStoredInPagingFiles + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Status + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.SuiteMask + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.SystemDevice + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.SystemDirectory + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.SystemDrive + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.TotalSwapSpaceSize + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.TotalVirtualMemorySize + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.TotalVisibleMemorySize + "</td></tr>";
            info += "<tr style='color: red'><td>" + p.Version + "</td></tr>";
            i++;
        }
        info += "</table>";
        return info;
    },

    //用户帐号信息
    UidInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_UserAccount");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;' ><td width='450'>用户帐号信息：</td></tr>";
        var i = 1;
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();

            info += "<tr style='color: red'><td > " + i + ":" + p.AccountType + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Caption + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Description + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Disabled + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Domain + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.FullName + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.InstallDate + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.LocalAccount + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Lockout + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Name + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.PasswordChangeable + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.PasswordExpires + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.PasswordRequired + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.SID + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.SIDType + "</td></tr>";
            info += "<tr style='color: red'><td > " + i + ":" + p.Status + "</td></tr>";
            i++;
        }
        info += "</table>";
        return info;
    },

    //系统组帐号信息
    SysuidInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_GroupUser");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;' ><td colspan='3'>系统组帐号信息：</td></tr>";
        info += "<tr style='color: red'><td >id</td><td >GroupComponent</td><td >PartComponent</td></tr>";
        var i = 1;
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();

            info += "<tr style='color: red'><td > " + i + "</td>";
            info += "<td>" + p.GroupComponent + "</td>";
            info += "<td>" + p.PartComponent + "</td></tr>";
            i++;
        }
        info += "</table>";
        return info;
    },

    //系统管理组信息
    SysmadInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_Group");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;' ><td colspan='10'>系统管理组信息：</td></tr>";
        info += "<tr style='color: red'><td >id</td><td >Caption</td><td >Description</td><td >Domain</td><td >InstallDate</td><td >LocalAccount</td><td >Name</td><td >SID</td><td >SIDType</td><td >Status</td></tr>";
        var i = 1;
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();

            info += "<tr style='color: red'><td>" + i + "</td>";
            info += "<td>" + p.Caption + "</td>";
            info += "<td>" + p.Description + "</td>";
            info += "<td>" + p.Domain + "</td>";
            info += "<td>" + p.InstallDate + "</td>";
            info += "<td>" + p.LocalAccount + "</td>";
            info += "<td>" + p.Name + "</td>";
            info += "<td>" + p.SID + "</td>";
            info += "<td>" + p.SIDType + "</td>";
            info += "<td>" + p.Status + "</td></tr>";
            i++;
        }
        info += "</table>";
        return info;
    },

    //系统安装的服务信息
    SysserInfo() {
        var locator = new ActiveXObject("WbemScripting.SWbemLocator");
        var service = locator.ConnectServer(".");
        var properties = service.ExecQuery("SELECT * FROM Win32_Service");
        var e = new Enumerator(properties);
        var info = "<table border=1>";
        info += "<tr bgcolor='#CDEDED' style='font-weight: bold;' ><td colspan='26'>系统安装的服务信息：</td></tr>";
        info += "<tr style='color: red'><td>id</td><td>AcceptPause</td><td>AcceptStop</td><td>Caption</td><td>CheckPoint</td><td>CreationClassName</td><td>Description</td><td>DesktopInteract</td><td>DisplayName</td><td>ErrorControl</td><td>ExitCode</td><td>InstallDate</td><td>Name</td><td>PathName</td><td>ProcessId</td><td>ServiceSpecificExitCode</td><td>ServiceType</td><td>Started</td><td>StartMode</td><td>StartName</td><td>State</td><td>Status</td><td>SystemCreationClassName</td><td>SystemName</td><td>TagId</td><td>WaitHint</td></tr>";
        var i = 1;
        for (; !e.atEnd(); e.moveNext()) {
            var p = e.item();

            info += "<tr style='color: red'><td> " + i + "</td> ";
            info += " <td>" + p.AcceptPause + "</td> ";
            info += " <td>" + p.AcceptStop + "</td> ";
            info += " <td>" + p.Caption + "</td> ";
            info += " <td>" + p.CheckPoint + "</td> ";
            info += " <td>" + p.CreationClassName + "</td> ";
            info += " <td>" + p.Description + "</td> ";
            info += " <td>" + p.DesktopInteract + "</td> ";
            info += " <td>" + p.DisplayName + "</td> ";
            info += " <td>" + p.ErrorControl + "</td> ";
            info += " <td>" + p.ExitCode + "</td> ";
            info += " <td>" + p.InstallDate + "</td> ";
            info += " <td>" + p.Name + "</td> ";
            info += " <td>" + p.PathName + "</td> ";
            info += " <td>" + p.ProcessId + "</td> ";
            info += " <td>" + p.ServiceSpecificExitCode + "</td> ";
            info += " <td>" + p.ServiceType + "</td> ";
            info += " <td>" + p.Started + "</td> ";
            info += " <td>" + p.StartMode + "</td> ";
            info += " <td>" + p.StartName + "</td> ";
            info += " <td>" + p.State + "</td> ";
            info += " <td>" + p.Status + "</td> ";
            info += " <td>" + p.SystemCreationClassName + "</td> ";
            info += " <td>" + p.SystemName + "</td> ";
            info += " <td>" + p.TagId + "</td> ";
            info += " <td>" + p.WaitHint + "</td></tr>";
            i++;
        }
        info += "</table>";
        return info;
    },

}