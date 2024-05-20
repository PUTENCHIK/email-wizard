class EmailSender {
    static uploadLetterTemplate() {
        if (! MyLocalStorage.get_letter_template()) {
            // window.open("letter-template.html");
            window.location.href = "letter-template.html";
        }
    }

    static sendEmail(theme, email) {
        let template = document.createElement("html");
        let templateHTML = MyLocalStorage.get_letter_template();
        template.innerHTML = templateHTML.trim();

        let scripts = template.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
            scripts[i].remove();
        }

        let letterHTML = RedactorReader.readLetterContent();
        // MyLocalStorage.set_html_current_letter(letterHTML);
        // let letterHTML = MyLocalStorage.get_current_letter()['html'];

        template.getElementsByClassName("mainTableContainer")[0].insertAdjacentHTML("afterbegin", letterHTML);

        let emailContent = `To: ${email}\n`;
        emailContent += `Subject: ${theme}\n`
        emailContent += `X-Unsent: 1\n`
        emailContent += `Content-Type: text/html; charset=utf-8\n\n`
        emailContent += template.outerHTML;

        let data = new Blob([emailContent], {type: 'text/plain'});
        let textFile = window.URL.createObjectURL(data);

        let a = document.createElement('a');
        a.href = textFile;
        a.download = "emailwizard_letter.eml";
        a.click();
        a.remove();
    }
}