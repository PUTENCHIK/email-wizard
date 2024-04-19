function Header1() {
    return (
        <table className="template" cellpadding={"0"} cellspacing={"0"} width={"600"} bgcolor={"#FFFFFF"} align={"center"}>             
            <tr>
                <td align={"center"} height={"75px"} bgcolor={"#333333"}>
                    <img align={"center"} src={"./img/logoFashion.png"} width={"160px"}/>
                </td>
            </tr>
            <tr>
                <td align={"center"} style={{paddingTop: "20px", paddingBottom: "20px"}} bgcolor={"#FFFFFF"}>
                    <table cellpadding={"0"} cellspacing={"0"} width={"550"} bgcolor={"#FFFFFF"} align={"center"}>
                        <tr align={"center"}>
                            <td className="menu">
                                <a href="#"><span style={{fontSize: "20px", fontFamily: "Arial, Helvetica, sans-serif"}}>Home</span></a>
                            </td>
                            <td className="menu">
                                <a href="#"><span style={{fontSize: "20px", fontFamily: "Arial, Helvetica, sans-serif"}}>Women</span></a>
                            </td>
                            <td className="menu">
                                <a href="#"><span style={{fontSize: "20px", fontFamily: "Arial, Helvetica, sans-serif"}}>Men</span></a>
                            </td>
                            <td className="menu">
                                <a href="#"><span style={{fontSize: "20px", fontFamily: "Arial, Helvetica, sans-serif"}}>Sale</span></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    )
}

function Header2() {
    return (
        <table className="template" cellpadding={"0"} cellspacing={"0"} width={"600"} bgcolor={"#FFFFFF"} align={"center"}>
            <tr>
                <td bgcolor="white" class="header-td">
                    <table class="table-550" cellpadding="0" cellspacing="0" width="550" bgcolor="white" align="center">
                        <tr>
                            <td>
                                <table align="left" class="menu leftMenu" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td><a href="#">Menu</a></td>
                                        <td><a href="#">Reservation</a></td>
                                    </tr>
                                </table>
                            </td>
                            <td align="center">
                                <img class="logo" src="./img/logo.png" alt="logo"/>
                            </td>
                            <td>
                                <table align="center" class="menu rightMenu" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td><a href="#">Events</a></td>
                                        <td><a href="#">Contact</a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    )
}

function Main1() {
    return (
    <table className="template main1" cellpadding={"0"} cellspacing={"0"} width={"600"} bgcolor={"#FFFFFF"} align={"center"}>    
        <tr>
            <td class="banner-td">
                <a href="#">
                    <img src="./img/welcome.jpg" alt="banner" />
                </a>
            </td>
        </tr>
    </table>
    )
}

function Main2() {
    return (
    <table className="template main2" cellpadding={"0"} cellspacing={"0"} width={"600"} bgcolor={"#FFFFFF"} align={"center"}>    
        <tr>
            <td bgcolor="#FFFFFF" align="center" className="greetings">
                <span style={{fontSize: "32px", fontFamily: "Arial, Helvetica, sans-serif;"}}>Hi Emeli,</span>
                <hr />
            </td>
        </tr>
        <tr>
            <td bgcolor="#FFFFFF" align="center" className="thanks">
                <p style={{lineHeight: "150%", fontSize: "18px", fontFamily: "'Times New Roman', Times, serif"}}>Thanks for registering on our site.<br/>Before we get started, we'll need to verify your email.</p>
            </td>
        </tr>
        <tr>
            <td bgcolor="#FFFFFF" class="confirmButton">
                <table className="table-150" bgcolor="#ccad53" cellpadding="0" cellspacing="0" width="200" height="50" align="center">
                    <tr>
                        <td className="confirm" align="center">
                            <span style={{color: "#ffffff", fontSize: "22px", fontFamily: "'Times New Roman', Times, serif"}}>Confirm my email</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    )
}

function Footer1() {
    return (
        <table className="template" cellpadding={"0"} cellspacing={"0"} width={"600"} bgcolor={"#FFFFFF"} align={"center"}>  
            <tr>
                <td bgcolor="#FFFFFF" align="center">
                    <hr bgcolor="#cccccc" width="525"/>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#FFFFFF">
                    <img className="footerLogo" src="./img/logo.png" alt="logo"/>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#FFFFFF" className="why">
                    <p style={{color: "#666666", fontSize: "13px", fontFamily: "'Times New Roman', Times, serif"}}>You are receiving this email because you have visited our site or asked us about regular newsletter.</p>
                </td>
            </tr>
        </table>
    )
}