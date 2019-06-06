/*!
 *  Lang.js for Laravel localization in JavaScript.
 *
 *  @version 1.1.10
 *  @license MIT https://github.com/rmariuzzo/Lang.js/blob/master/LICENSE
 *  @site    https://github.com/rmariuzzo/Lang.js
 *  @author  Rubens Mariuzzo <rubens@mariuzzo.com>
 */
(function (root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([], factory)
    } else if (typeof exports === "object") {
        module.exports = factory()
    } else {
        root.Lang = factory()
    }
})(this, function () {
    "use strict";

    function inferLocale() {
        if (typeof document !== "undefined" && document.documentElement) {
            return document.documentElement.lang
        }
    }

    function convertNumber(str) {
        if (str === "-Inf") {
            return -Infinity
        } else if (str === "+Inf" || str === "Inf" || str === "*") {
            return Infinity
        }
        return parseInt(str, 10)
    }

    var intervalRegexp = /^({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])$/;
    var anyIntervalRegexp = /({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])/;
    var defaults = {locale: "en"};
    var Lang = function (options) {
        options = options || {};
        this.locale = options.locale || inferLocale() || defaults.locale;
        this.fallback = options.fallback;
        this.messages = options.messages
    };
    Lang.prototype.setMessages = function (messages) {
        this.messages = messages
    };
    Lang.prototype.getLocale = function () {
        return this.locale || this.fallback
    };
    Lang.prototype.setLocale = function (locale) {
        this.locale = locale
    };
    Lang.prototype.getFallback = function () {
        return this.fallback
    };
    Lang.prototype.setFallback = function (fallback) {
        this.fallback = fallback
    };
    Lang.prototype.has = function (key, locale) {
        if (typeof key !== "string" || !this.messages) {
            return false
        }
        return this._getMessage(key, locale) !== null
    };
    Lang.prototype.get = function (key, replacements, locale) {
        if (!this.has(key, locale)) {
            return key
        }
        var message = this._getMessage(key, locale);
        if (message === null) {
            return key
        }
        if (replacements) {
            message = this._applyReplacements(message, replacements)
        }
        return message
    };
    Lang.prototype.trans = function (key, replacements) {
        return this.get(key, replacements)
    };
    Lang.prototype.choice = function (key, number, replacements, locale) {
        replacements = typeof replacements !== "undefined" ? replacements : {};
        replacements.count = number;
        var message = this.get(key, replacements, locale);
        if (message === null || message === undefined) {
            return message
        }
        var messageParts = message.split("|");
        var explicitRules = [];
        for (var i = 0; i < messageParts.length; i++) {
            messageParts[i] = messageParts[i].trim();
            if (anyIntervalRegexp.test(messageParts[i])) {
                var messageSpaceSplit = messageParts[i].split(/\s/);
                explicitRules.push(messageSpaceSplit.shift());
                messageParts[i] = messageSpaceSplit.join(" ")
            }
        }
        if (messageParts.length === 1) {
            return message
        }
        for (var j = 0; j < explicitRules.length; j++) {
            if (this._testInterval(number, explicitRules[j])) {
                return messageParts[j]
            }
        }
        var pluralForm = this._getPluralForm(number);
        return messageParts[pluralForm]
    };
    Lang.prototype.transChoice = function (key, count, replacements) {
        return this.choice(key, count, replacements)
    };
    Lang.prototype._parseKey = function (key, locale) {
        if (typeof key !== "string" || typeof locale !== "string") {
            return null
        }
        var segments = key.split(".");
        var source = segments[0].replace(/\//g, ".");
        return {
            source: locale + "." + source,
            sourceFallback: this.getFallback() + "." + source,
            entries: segments.slice(1)
        }
    };
    Lang.prototype._getMessage = function (key, locale) {
        locale = locale || this.getLocale();
        key = this._parseKey(key, locale);
        if (this.messages[key.source] === undefined && this.messages[key.sourceFallback] === undefined) {
            return null
        }
        var message = this.messages[key.source];
        var entries = key.entries.slice();
        var subKey = "";
        while (entries.length && message !== undefined) {
            var subKey = !subKey ? entries.shift() : subKey.concat(".", entries.shift());
            if (message[subKey] !== undefined) {
                message = message[subKey];
                subKey = ""
            }
        }
        if (typeof message !== "string" && this.messages[key.sourceFallback]) {
            message = this.messages[key.sourceFallback];
            entries = key.entries.slice();
            subKey = "";
            while (entries.length && message !== undefined) {
                var subKey = !subKey ? entries.shift() : subKey.concat(".", entries.shift());
                if (message[subKey]) {
                    message = message[subKey];
                    subKey = ""
                }
            }
        }
        if (typeof message !== "string") {
            return null
        }
        return message
    };
    Lang.prototype._findMessageInTree = function (pathSegments, tree) {
        while (pathSegments.length && tree !== undefined) {
            var dottedKey = pathSegments.join(".");
            if (tree[dottedKey]) {
                tree = tree[dottedKey];
                break
            }
            tree = tree[pathSegments.shift()]
        }
        return tree
    };
    Lang.prototype._applyReplacements = function (message, replacements) {
        for (var replace in replacements) {
            message = message.replace(new RegExp(":" + replace, "gi"), function (match) {
                var value = replacements[replace];
                var allCaps = match === match.toUpperCase();
                if (allCaps) {
                    return value.toUpperCase()
                }
                var firstCap = match === match.replace(/\w/i, function (letter) {
                    return letter.toUpperCase()
                });
                if (firstCap) {
                    return value.charAt(0).toUpperCase() + value.slice(1)
                }
                return value
            })
        }
        return message
    };
    Lang.prototype._testInterval = function (count, interval) {
        if (typeof interval !== "string") {
            throw"Invalid interval: should be a string."
        }
        interval = interval.trim();
        var matches = interval.match(intervalRegexp);
        if (!matches) {
            throw"Invalid interval: " + interval
        }
        if (matches[2]) {
            var items = matches[2].split(",");
            for (var i = 0; i < items.length; i++) {
                if (parseInt(items[i], 10) === count) {
                    return true
                }
            }
        } else {
            matches = matches.filter(function (match) {
                return !!match
            });
            var leftDelimiter = matches[1];
            var leftNumber = convertNumber(matches[2]);
            if (leftNumber === Infinity) {
                leftNumber = -Infinity
            }
            var rightNumber = convertNumber(matches[3]);
            var rightDelimiter = matches[4];
            return (leftDelimiter === "[" ? count >= leftNumber : count > leftNumber) && (rightDelimiter === "]" ? count <= rightNumber : count < rightNumber)
        }
        return false
    };
    Lang.prototype._getPluralForm = function (count) {
        switch (this.locale) {
            case"az":
            case"bo":
            case"dz":
            case"id":
            case"ja":
            case"jv":
            case"ka":
            case"km":
            case"kn":
            case"ko":
            case"ms":
            case"th":
            case"tr":
            case"vi":
            case"zh":
                return 0;
            case"af":
            case"bn":
            case"bg":
            case"ca":
            case"da":
            case"de":
            case"el":
            case"en":
            case"eo":
            case"es":
            case"et":
            case"eu":
            case"fa":
            case"fi":
            case"fo":
            case"fur":
            case"fy":
            case"gl":
            case"gu":
            case"ha":
            case"he":
            case"hu":
            case"is":
            case"it":
            case"ku":
            case"lb":
            case"ml":
            case"mn":
            case"mr":
            case"nah":
            case"nb":
            case"ne":
            case"nl":
            case"nn":
            case"no":
            case"om":
            case"or":
            case"pa":
            case"pap":
            case"ps":
            case"pt":
            case"so":
            case"sq":
            case"sv":
            case"sw":
            case"ta":
            case"te":
            case"tk":
            case"ur":
            case"zu":
                return count == 1 ? 0 : 1;
            case"am":
            case"bh":
            case"fil":
            case"fr":
            case"gun":
            case"hi":
            case"hy":
            case"ln":
            case"mg":
            case"nso":
            case"xbr":
            case"ti":
            case"wa":
                return count === 0 || count === 1 ? 0 : 1;
            case"be":
            case"bs":
            case"hr":
            case"ru":
            case"sr":
            case"uk":
                return count % 10 == 1 && count % 100 != 11 ? 0 : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? 1 : 2;
            case"cs":
            case"sk":
                return count == 1 ? 0 : count >= 2 && count <= 4 ? 1 : 2;
            case"ga":
                return count == 1 ? 0 : count == 2 ? 1 : 2;
            case"lt":
                return count % 10 == 1 && count % 100 != 11 ? 0 : count % 10 >= 2 && (count % 100 < 10 || count % 100 >= 20) ? 1 : 2;
            case"sl":
                return count % 100 == 1 ? 0 : count % 100 == 2 ? 1 : count % 100 == 3 || count % 100 == 4 ? 2 : 3;
            case"mk":
                return count % 10 == 1 ? 0 : 1;
            case"mt":
                return count == 1 ? 0 : count === 0 || count % 100 > 1 && count % 100 < 11 ? 1 : count % 100 > 10 && count % 100 < 20 ? 2 : 3;
            case"lv":
                return count === 0 ? 0 : count % 10 == 1 && count % 100 != 11 ? 1 : 2;
            case"pl":
                return count == 1 ? 0 : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? 1 : 2;
            case"cy":
                return count == 1 ? 0 : count == 2 ? 1 : count == 8 || count == 11 ? 2 : 3;
            case"ro":
                return count == 1 ? 0 : count === 0 || count % 100 > 0 && count % 100 < 20 ? 1 : 2;
            case"ar":
                return count === 0 ? 0 : count == 1 ? 1 : count == 2 ? 2 : count % 100 >= 3 && count % 100 <= 10 ? 3 : count % 100 >= 11 && count % 100 <= 99 ? 4 : 5;
            default:
                return 0
        }
    };
    return Lang
});

(function () {
    Lang = new Lang();
    Lang.setMessages({
        "en.auth": {
            "failed": "These credentials do not match our records.",
            "throttle": "Too many login attempts. Please try again in :seconds seconds."
        },
        "en.label": {
            "Account": {
                "ModalChangeEmail": {
                    "Message": "Type your password for safety",
                    "Password": "Your password",
                    "btChangeEmail": "Change e-mail",
                    "newEmail": "New e-mail"
                },
                "ModalChangePass": {
                    "btChangePass": "Change password",
                    "curPass": "Current password",
                    "newPass": "New password"
                },
                "ModalDeleteAcc": {
                    "Alert": "Your account will automatically deleted, you want to continue...",
                    "Message": "Type your password for safety",
                    "Password": "Your password",
                    "btDeleteAcc": "Delete my account"
                },
                "changeEmail": "Change account e-mail address",
                "changePassword": "Change account password",
                "deleteAcc": "Delete account",
                "plan": "My plan"
            },
            "Activities": {
                "activity": "Activity",
                "addActivities": "Add activity",
                "edit": "Edit activity",
                "field1": "Activity (E.g: Techcrunch Disrupt)",
                "field2": "Details (E.g: Digital Compression Pioneer)",
                "optional": "(optional)",
                "title": "Activities"
            },
            "Additional": {
                "a_i": "Additional Information",
                "addAI": "Add additional information",
                "edit": "Edit additional information",
                "title": "Additional Information"
            },
            "Alert": {
                "AddField": {"fail": "Can&apos;t add", "success": "Add"},
                "DeleteField": {"fail": "Can&apos;t delete", "success": "Deleted"},
                "EmailExists": "exists",
                "Save": {"fail": "Can&apos;t save", "success": "All changes saved"},
                "cancelButton": "No, cancel plx!",
                "confirmButton": "Yes, take it!",
                "confirmSave": "Save CV ?",
                "copyToClipboard": "Copy URL to clipboard",
                "errorPass": "Error !!! Password Not Valid",
                "fillEmail": "Please fill in your email address",
                "fillPass": "Please fill in your password",
                "loadTemplateFail": "Cant load template",
                "messCancel": "Cancelled",
                "messChangeEmail": "Your email has been changed successfully! Thank you",
                "messChangePass": "Your password has been changed successfully! Thank you",
                "messChangeSuccess": "It has successfully changed!",
                "messDeleteAcc": "Your account has been delete successfully! Thank you",
                "messError": "Error, plx try again !",
                "messErrorDownload": "Please save the document before downloading",
                "messSetName": "Please enter a name",
                "saveShare": "Please save changes before opening document preview.",
                "titleConfirm": "Are you sure?",
                "titleSuccess": "Successfully!"
            },
            "Awards": {"Award": "Award", "addInterests": "Add award", "edit": "Edit award", "title": "Awards"},
            "CL": {
                "Copy": "Copy",
                "Delete": "Delete",
                "Download": "Download",
                "Edit": "Edit",
                "EditName": "Edit file name",
                "ModalChangeName": {"Name": "Name", "btChangeName": "Save", "header": "Rename document"},
                "ModalCopyCL": {
                    "Alert": "Are you sure you want to copy this document?",
                    "btCopyCL": "Copy",
                    "header": "Copy Document"
                },
                "ModalCreateCL": {
                    "Lang": "Language",
                    "Name": "Name",
                    "btCreateCL": "Create",
                    "header": "Set name",
                    "labelLang": "Select the language you would like to display in your doccument"
                },
                "ModalDeleteCL": {
                    "Alert": "Are you sure to delete this document?",
                    "btDeleteCL": "Delete",
                    "header": "Remove Document"
                },
                "View": "View",
                "columnDownload": "Download",
                "columnLastModified": "Last modified",
                "columnName": "Name",
                "columnOptions": "Options",
                "columnView": "Views",
                "compareSalary": "Compare Salary",
                "createCL": "Create new cover letter"
            },
            "CV": {
                "AlertDownload": "You cant downloads for this document.",
                "Copy": "Copy",
                "Delete": "Delete",
                "Download": "Download",
                "Edit": "Edit",
                "EditName": "Edit file name",
                "ModalChangeName": {"Name": "Name", "btChangeName": "Save", "header": "Rename document"},
                "ModalCopyCV": {
                    "Alert": "Are you sure you want to copy this document?",
                    "btCopyCV": "Copy",
                    "header": "Copy Document"
                },
                "ModalCreateCV": {
                    "Lang": "Language",
                    "Name": "Name",
                    "btCreateCV": "Create",
                    "header": "Set name",
                    "labelLang": "Select the language you would like to display in your doccument"
                },
                "ModalDeleteCV": {
                    "Alert": "Are you sure to delete this document?",
                    "btDeleteCV": "Delete",
                    "header": "Remove Document"
                },
                "View": "View",
                "columnDownload": "Download",
                "columnLastModified": "Last modified",
                "columnName": "Name",
                "columnOptions": "Options",
                "columnView": "Views",
                "compareSalary": "Compare Salary",
                "createCV": "Create new resume"
            },
            "EditorPage": {"modeSetting": "Basic settings", "setColor": "Color sets"},
            "Education": {
                "School": "School",
                "TipsEducation": {
                    "Tips1": "If you have got more than two years of work experience, the education section should go on the resume below your experience section.",
                    "Tips2": "Add your field of study, the name of your university, and the degree you obtained. Do not include information about secondary education (e.g., high school) unless the schools profile is strongly related to your profession).",
                    "Tips3": "You can add academic achievements if you want. These might include an above-average academic record, scholarships, awards, etc.",
                    "TipsLeft": "Tips",
                    "examRight": "University of Technology, Anytown, Ca M.A. in Digital Marketing, 2010",
                    "examWrong": "University of Technology",
                    "intro": "Add different schools, colleges, and universities that you attended. Describe them by adding information about your majors or extracurricular activities.",
                    "right": "Right",
                    "seeLess": "See&nbsp;less",
                    "seeMore": "See&nbsp;tips&nbsp;&amp;&nbsp;examples",
                    "wrong": "Wrong"
                },
                "addSchool": "Add new school",
                "datefrom": "Date from",
                "dateto": "Date to",
                "description": "Description",
                "editTitle": "Edit title",
                "optional": "(optional)",
                "schoolName": "School name, major, minor, degree",
                "title": "Education",
                "today": "Till Today"
            },
            "Experience": {
                "TipsExperience": {
                    "TipsLeft": "Tips",
                    "calendar1": "October 2013 - Present",
                    "calendar2": "June 2013 - April 2016",
                    "com1": "Acme Company",
                    "content8": "A passionate Mathematics teage-prep high school students",
                    "exam3": "Negotiated a plan with suppliers that cut office expenses by $5,000 annually.",
                    "exam4": "I increased sales by 20% within 12 months.",
                    "exam6": "\"organized,\" \"trained,\" \"arranged,\" or \"distributed.\"",
                    "exlist1": "Responsibilities",
                    "exlist2": "Achievements",
                    "header8": "Resume Summary for a Teacher",
                    "intro": "List your work experience, add different positions you held and describe your responsibilites. Dont forget to highlight your biggest achievements!",
                    "list1": "Trusted with a $350,000 budget to coordinate international travel arrangements for executives. ",
                    "list10": "Managed a financial team of 5+ employees responsible for payroll while increasing efficiency in the department by 12%. ",
                    "list2": "Trained 3 Administrative Assistants in customer service and other office procedures.",
                    "list3": "Organized office transition from paper invoices to Quickbooks and online invoicing. ",
                    "list4": "Saved $3,000 a year in office supplies after negotiating a new deal with our current supplier.",
                    "list5": "Managed assets, liability, and capital account entries.",
                    "list6": "Compiled and analyze account information.",
                    "list7": "Documented financial transactions and recommend financial action.",
                    "list8": "Recommended financial actions and contributed to 7% greater savings.",
                    "list9": "Balanced a $500,000 budget with regular cost savings of averaging 10% every year. ",
                    "pos1": "Administrative Assistant",
                    "pos2": "Accountant",
                    "right": "Right",
                    "seeLess": "See&nbsp;less",
                    "seeMore": "See&nbsp;tips&nbsp;&amp;&nbsp;examples",
                    "text1": "Start with your current position, then list all the previous positions.",
                    "text2": "Avoid long descriptions and big blocks of text. Stick to 6-8 points.",
                    "text3": "Use this formula: I solved problem X by implementing action Y resulting in Z.",
                    "text4": "Show off your achievements in numbers. Do not give out sensitive information.",
                    "text5": "Choose your experience to match the employers requirements from the job ad. Delete any unnecessary information.",
                    "text6": "Use power words instead of clich\u00e9s to highlight your strengths.",
                    "title1": "Use the reverse-chronological order",
                    "title2": "Use bullet points",
                    "title3": "Add achievements",
                    "title4": "Add numbers",
                    "title5": "Tailor your resume",
                    "title6": "Action words"
                },
                "addCompany": "Add new company",
                "company": "Company",
                "datefrom": "Date from",
                "dateto": "Date to",
                "editTitle": "Edit title",
                "experience": "Experience",
                "line1": "Line 1 (e.g. position)",
                "line2": "Line 2 (e.g. company, department)",
                "optional": "(optional)",
                "title": "Experience",
                "today": "Till Today"
            },
            "ForgotPass": {
                "Email": "E-Mail Address",
                "PassConfirm": "Confirm Password",
                "Password": "Password",
                "btResetPass": "Send Password Reset Link",
                "label": "I forgot my password"
            },
            "Home": {
                "btCreateCV": "Create my resume now",
                "compareSalary": "Compare Salary",
                "contentBenefits1": "Write a cover letter using the same templates as your resume.",
                "contentBenefits2": "Find out if employers are reading and downloading your resumes.",
                "contentBenefits3": "Our online resume builder will help you write a perfect resume in minutes.",
                "contentBenefits4": "Create a modern and professional resume and cover letter.",
                "contentBenefits5": "Our experts tips will show you how to write a resume.",
                "contentBenefits6": "You will have access to the best text editor available.",
                "contentReason1": "Choose professional, elegant, creative, or modern resume templates. OneCV resume maker offers 20 templates in 400 colors. You can easily adapt the designs to any resume format you choose: functional, reverse-chronological, or combination.",
                "contentReason2": "You no longer have to worry about how to make a resume. Our resume generator will guide you through the process of writing each section, step-by-step. Resume writing tips will help you get more job offers.",
                "contentReason3": "Choose font types, sizes, and spacing. You can bold, italicize, and underline your text. Want to add live URLs? We are got you covered. Its like creating your resume in Word, but we take care of the formatting, and give you access to the best resume templates.",
                "contentReason4": "Create your professional Cover Letter in just a few simple steps. Use the same template for your cover letter and resume. Convince hiring managers to set up an interview with you.",
                "labelBenefits": "What are the benefits of Uptowork\u2019s online resume maker?",
                "labelIntro1": "Write and publish your professional resume online.",
                "labelIntro2": "Use your online resume to attract employers. Track your performance.",
                "labelIntro3": "Create an individual URL for your online resume.",
                "labelIntro4": "Employers can view and download your resume",
                "labelIntro5": "Track how many employers view and download your resume.",
                "labelIntro6": "Edit, publish and download your resumes any time you want.",
                "labelReason": "Why is OneCV the best resume builder online?",
                "sologan1": "Resume Builder Online ",
                "sologan2": "It&#39;s free and always will be.",
                "titleBenefits1": "Cover Letter Builder",
                "titleBenefits2": "Track Your Resume",
                "titleBenefits3": "Its Fast and Easy to Use",
                "titleBenefits4": "20 Best Resume Templates",
                "titleBenefits5": "Follow Tips From Experts",
                "titleBenefits6": "Flexible Text Editor",
                "titleReason1": "Professional Resume Templates",
                "titleReason2": "Tips From Recruiters",
                "titleReason3": "Edit Your Resume As You Like",
                "titleReason4": "Cover Letter and Resume Builder",
                "trick": "I found an article about how to write a professional resume on Uptowork. Then I discovered the application. Its useful and simple to use. Its not a free resume builder, but I guess you cant have everything."
            },
            "Interests": {
                "Interest": "Interest",
                "TipsInterests": {
                    "Tips1": "If you have interesting or relevant hobbies, you can add them to your resume.",
                    "Tips2": "Be brief. This section must not dominate other sections.",
                    "Tips3": "You can add academic achievements if you want. These might include an above-average academic record, scholarships, awards, etc.",
                    "TipsLeft": "Tips",
                    "examRight1": "Russian literature",
                    "examRight2": "Backpacking",
                    "examWrong": "I\u2019m an experienced backpacker who\u2019s travelled from Moscow to Lisbon on an epic hitch-hiking tour or Europe. In my spare time, I like to read novels written by Dostoevsky, Gogol, and other Russian writers. I actually read War and Peace on that road trip. It\u2019s a pretty heavy book but I wouldn\u2019t have survived the journey without my daily dose of reading.",
                    "intro": "Showcase your casual side. List your interests and hobbies to connect with the recruiter.",
                    "right": "Right",
                    "seeLess": "See&nbsp;less",
                    "seeMore": "See&nbsp;tips&nbsp;&amp;&nbsp;examples",
                    "wrong": "Wrong"
                },
                "addSchool": "Add new interest",
                "editTitle": "Edit title",
                "title": "Interests"
            },
            "Languages": {
                "addLanguages": "Add language",
                "edit": "Edit languages",
                "field1": "Language (E.g: English)",
                "field2": "Level (E.g: Good)",
                "lang": "Language",
                "optional": "(optional)",
                "title": "Languages"
            },
            "LetterContent": {
                "City": "City, date ",
                "Content": "Content",
                "Recipient": "Recipient",
                "Title": "Cover letter content"
            },
            "Login": {
                "LabelForgotPass": "Forgot your password?",
                "LabelSignUp": "Need an account?",
                "LogIn": "Log In",
                "LogInSocial": "Or log in with",
                "btLogin": "Log In Now",
                "btResetPass": "Reset password",
                "btSignUp": "Sign Up",
                "message_email_exists": "Email already exists",
                "message_email_not_update": "Please update your email before logging in",
                "message_login": "Login Successary.",
                "message_login_fail": "Wrong e-mail address or password.",
                "message_logout": "You have been logged out",
                "message_register": "Register Successary"
            },
            "MenuEditCL": {
                "Download": "Download",
                "Preview": "Preview",
                "PreviewCustomize": "Preview &amp; Customize",
                "ShareCL": "Online Cover Letter",
                "editor": "Editor",
                "template": "Template"
            },
            "MenuEditCV": {
                "AddRemoveSecsion": "Add &amp; Remove Sections",
                "Download": "Download",
                "Preview": "Preview",
                "PreviewCustomize": "Preview &amp; Customize",
                "Secsions": "Secsions",
                "ShareCV": "Online Resume",
                "editor": "Editor",
                "template": "Template"
            },
            "MenuSecsionCL": {
                "contentCL": "Letter content",
                "edit": "Edit pages",
                "fontfamily": "Font",
                "fontsize": "Font size",
                "header": "Fill in your cover letter",
                "linespacing": "Line Spacing",
                "nameCL": "Name CL",
                "personal": "Personal Info",
                "saveCL": "Save Cover Letter",
                "setcolor": "Set Color"
            },
            "MenuSecsionCV": {
                "AddRemove": {"add": "Add", "remove": "Remove"},
                "addSecsion": "Add Secsions",
                "edit": "Edit pages",
                "education": "Education",
                "experience": "Experience",
                "fontfamily": "Font",
                "fontsize": "Font size",
                "header": "Fill in your resume",
                "interests": "Interests",
                "linespacing": "Line Spacing",
                "nameCV": "Name CV",
                "personal": "Personal Info",
                "saveCV": "Save CV",
                "secsionLayout": "Section Layout",
                "setcolor": "Set Color",
                "skills": "Skills",
                "summary": "Summary"
            },
            "Personal": {
                "TipsPersonal": {
                    "TipsLeft": "Tips",
                    "contact": "Contact Infomation",
                    "contactContent": "Include your primary phone number and email address. You do not need to provide your place of residence if the employer does not require it.",
                    "intro": "Fill in only the information you would like to show on your resume. Leave other fields empty. ",
                    "photo": "Photo",
                    "photoContent": "If you are adding a photo, make sure it is taken against a light background. You should be wearing business attire. A slight smile is acceptable. Do not add informal photos. Note: Adding a photo on a resume is not a common practice in some countries. If you are applying for a job in the US or the UK, do not add photos. ",
                    "proContent": "Add the name of the position for which you are applying. It will appear under your name giving your resume a personal touch and showing that you tailored your resume to that position.",
                    "profession": "Profession",
                    "right": "Right",
                    "seeLess": "See&nbsp;less",
                    "seeMore": "See&nbsp;tips&nbsp;&amp;&nbsp;examples",
                    "social": "Social media",
                    "socialContent": "You can add a link to your website as well as your social media handles. Hint: When you add your LinkedIn profile, remember to personalize your URL first.",
                    "wrong": "Wrong"
                },
                "addField": "Add custom field",
                "address": "Address",
                "citizenship": "Citizenship",
                "dateofbirth": "Date of birth",
                "delete": "Delete",
                "editTitle": "Edit title",
                "email": "E-mail",
                "firstname": "First name",
                "lastname": "Last name",
                "linkedin": "LinkedIn",
                "marital": "Marital status",
                "phone": "Phone",
                "placeofbirth": "Place of birth",
                "profession": "Profession",
                "title": "Personal Info",
                "twitter": "Twitter",
                "www": "WWW"
            },
            "Projects": {
                "addProjects": "Add project",
                "edit": "Edit project",
                "project": "Project",
                "title": "Projects"
            },
            "References": {
                "addReferences": "Add reference",
                "edit": "Edit reference",
                "field1": "Full name",
                "field2": "Position",
                "field3": "Phone",
                "field4": "Email",
                "optional": "(optional)",
                "reference": "Reference",
                "title": "References"
            },
            "Register": {
                "LabelForgotPass": "Forgot your password?",
                "LabelLogIn": "Already have an account?",
                "Login": "Log In",
                "SignUp": "Sign Up",
                "btResetPass": "Reset password",
                "terms": "By signing up, you agree to the"
            },
            "ShareCL": {
                "btPreview": "Preview",
                "btSave": "Save",
                "content1": "Send an individual link to your online resume.",
                "content2": "Employers can view and download your resume.",
                "content3": "Track how many employers view and download your resume.",
                "header1": "Share Your Cover Letter",
                "header2": "Send Your Cover Letter (Premium Only)",
                "header3": "Track Your Resume (Premium Only)",
                "link": "Please save changes before opening document preview.",
                "title": "Online Resume"
            },
            "ShareCV": {
                "btPreview": "Preview",
                "btSave": "Save",
                "content1": "Send an individual link to your online resume.",
                "content2": "Employers can view and download your resume.",
                "content3": "Track how many employers view and download your resume.",
                "header1": "Share Your Resume",
                "header2": "Send Your Resume (Premium Only)",
                "header3": "Track Your Resume (Premium Only)",
                "link": "Please save changes before opening document preview.",
                "title": "Online Resume"
            },
            "Skills": {
                "Skill": "Skill",
                "TipsSkills": {
                    "Tips1": "Place your skills on the first page of your resume. Use templates that show them in the side column. ",
                    "Tips2": "Match skills to the job, and place the most important skills on the top of the list. ",
                    "Tips3": "Use numbers and facts, for example: Manage sales team of 30+ people. Think about how you can stand out. Instead of writing knowledge of MS Excel, put advanced knowledge of MS Excel (macros, pivot tables).",
                    "Tips4": "Describe a level of your skill or use a rating. ",
                    "Tips5": "Use this rating if you would like to display your skill level by using a simple infographic. Rate your skills from 1 to 5.",
                    "TipsLeft": "Tips",
                    "com1": "Advanced",
                    "com3": "Advanced",
                    "examRightContent": "Advanced knowledge of MS Excel (macros, pivot tables, data visualization)Proficient in MS Access (creating and modifying databases, tables, queries and forms; reports)",
                    "examRightTitle": "Computer Skills",
                    "examWrong": "Excel, Access",
                    "intro": "Show the recruiter what you can do. Add different skills such as \"Problem solving\" or \"Microsoft Word\" to showcase your abilities.",
                    "pos1": "Salesforce (5 stars)",
                    "pos2": "MS Office - expert knowledge of the entire suite (5 stars)",
                    "pos3": "MS Excel (macros, pivot tables, data visualization) (5 stars)",
                    "pos4": "Problem Solving - improved workflow to increase productivity by 10% (4 stars)",
                    "right": "Right",
                    "seeLess": "See&nbsp;less",
                    "seeMore": "See&nbsp;tips&nbsp;&amp;&nbsp;examples",
                    "wrong": "Wrong"
                },
                "addSkills": "Add new skills",
                "editTitle": "Edit title",
                "field1": "Skill (e.g. Editing skills)",
                "field2": "Skill level (e.g. Excellent)",
                "field3": "Star rating ",
                "optional": "(optional)",
                "title": "Skills"
            },
            "Summary": {
                "TipsSummary": {
                    "TipsLeft": "Tips",
                    "content1": "Starting a resume summary with your professional title informs a recruiter that your resume is relevant",
                    "content2": "Add numbers and details. Focusing on results allows you to stand out and proves you are the right candidate",
                    "content3": "Find keywords from the job description, including skills and adjectives (dedicated, hardworking) and add them to your resume summary.",
                    "content4": "Administrative Assistant with 5 years of experience in juggling the schedule and travel plans of multiple executives. Adept in handling the busy schedules and travel plans of 3 corporate executives, while juggling other general office administration duties. Can execute appointment management, writing corporate emails, and bookkeeping while meeting deadlines.",
                    "content5": "Certified Public Accountant with an MBA and 2+ years of experience in specialized tax services and bookkeeping. Seeking to leverage my technical and professional expertise to learn and grow in the new role of Accountant at your company.",
                    "content6": "Analytical Civil Engineer with 6+ years of experience designing water and earthwork projects. An autonomous worker committed to providing high quality services. Proficient in AutoCAD and in possession of a Bachelor\u2019s in Civil Engineering.",
                    "content7": "Recent college graduate with 3+ years of experience in food preparation and bartending, and certified in ServSafe. Communications major seeking to leverage my interpersonal skills to provide a friendly, and fun atmosphere for the customers.",
                    "content8": "A passionate Mathematics teacher with 3+ years of teaching, guidance, and counseling experience. Possess a strong track record in improving test scores sometimes as high as 45% among college-prep high school students",
                    "exam1": "Marketing Manager with 5+ years of experience.",
                    "exam2": "Increased sales by 36% over 6 months.",
                    "exam3": "Outgoing and detail-oriented, proficient at building and maintaining professional relationships.",
                    "header1": "Start with your professional title",
                    "header2": "Add two or three achievements",
                    "header3": "Tailor it to the job offer",
                    "header4": "Resume Summary Example for an Administrative Assistant",
                    "header5": "Resume Summary Example for an Accountant",
                    "header6": "Resume Summary Example for a Civil Engineer",
                    "header7": "Resume Summary Example for a Student",
                    "header8": "Resume Summary for a Teacher",
                    "intro": "A resume summary is a short, snappy introduction highlighting your career progress, achievements and skill set.",
                    "right": "Right",
                    "seeLess": "See&nbsp;less",
                    "seeMore": "See&nbsp;tips&nbsp;&amp;&nbsp;examples"
                }, "editTitle": "Edit title", "optional": "(optional)", "summary": "Summary", "title": "Summary"
            },
            "btCancel": "Cancel",
            "lang": {"en": "English", "jp": "\u65e5\u672c\u8a9e", "vn": "Ti\u1ebfng Vi\u1ec7t"},
            "login": "Login",
            "logout": "Logout",
            "menuBlog": {
                "allPosts": "All posts",
                "coverLetter": "Cover Letter",
                "jobInterview": "Job Interviews",
                "jobSearch": "Job Search",
                "resumeExamples": "Resume Examples",
                "resumeWriting": "Resume Writing"
            },
            "menuHome": {
                "about": "About",
                "autodownload": "CV will be automatically downloaded later:",
                "autosave": "The information is automatically saved in",
                "contact": "Contact Us",
                "cvBuilder": "Resume Builder",
                "help": "Help",
                "helpCenter": "Help Center",
                "pricing": "Pricing"
            },
            "menuUser": {
                "Rewards": "Get Rewards",
                "account": "My Account",
                "manageCL": "My Cover Letters",
                "manageCV": "My Resumes"
            },
            "privacy": "Privacy Policy",
            "register": "Register",
            "reserved": "All rights reserved.",
            "termsofservice": "Terms of Service"
        },
        "en.pagination": {"next": "Next &raquo;", "previous": "&laquo; Previous"},
        "en.passwords": {
            "password": "Passwords must be at least six characters and match the confirmation.",
            "reset": "Your password has been reset!",
            "sent": "We have e-mailed your password reset link!",
            "token": "This password reset token is invalid.",
            "user": "We can't find a user with that e-mail address."
        },
        "en.validation": {
            "accepted": "The :attribute must be accepted.",
            "active_url": "The :attribute is not a valid URL.",
            "after": "The :attribute must be a date after :date.",
            "after_or_equal": "The :attribute must be a date after or equal to :date.",
            "alpha": "The :attribute may only contain letters.",
            "alpha_dash": "The :attribute may only contain letters, numbers, and dashes.",
            "alpha_num": "The :attribute may only contain letters and numbers.",
            "array": "The :attribute must be an array.",
            "attributes": [],
            "before": "The :attribute must be a date before :date.",
            "before_or_equal": "The :attribute must be a date before or equal to :date.",
            "between": {
                "array": "The :attribute must have between :min and :max items.",
                "file": "The :attribute must be between :min and :max kilobytes.",
                "numeric": "The :attribute must be between :min and :max.",
                "string": "The :attribute must be between :min and :max characters."
            },
            "boolean": "The :attribute field must be true or false.",
            "confirmed": "The :attribute confirmation does not match.",
            "custom": {"attribute-name": {"rule-name": "custom-message"}},
            "date": "The :attribute is not a valid date.",
            "date_format": "The :attribute does not match the format :format.",
            "different": "The :attribute and :other must be different.",
            "digits": "The :attribute must be :digits digits.",
            "digits_between": "The :attribute must be between :min and :max digits.",
            "dimensions": "The :attribute has invalid image dimensions.",
            "distinct": "The :attribute field has a duplicate value.",
            "email": "The :attribute must be a valid email address.",
            "exists": "The selected :attribute is invalid.",
            "file": "The :attribute must be a file.",
            "filled": "The :attribute field must have a value.",
            "image": "The :attribute must be an image.",
            "in": "The selected :attribute is invalid.",
            "in_array": "The :attribute field does not exist in :other.",
            "integer": "The :attribute must be an integer.",
            "ip": "The :attribute must be a valid IP address.",
            "ipv4": "The :attribute must be a valid IPv4 address.",
            "ipv6": "The :attribute must be a valid IPv6 address.",
            "json": "The :attribute must be a valid JSON string.",
            "max": {
                "array": "The :attribute may not have more than :max items.",
                "file": "The :attribute may not be greater than :max kilobytes.",
                "numeric": "The :attribute may not be greater than :max.",
                "string": "The :attribute may not be greater than :max characters."
            },
            "mimes": "The :attribute must be a file of type: :values.",
            "mimetypes": "The :attribute must be a file of type: :values.",
            "min": {
                "array": "The :attribute must have at least :min items.",
                "file": "The :attribute must be at least :min kilobytes.",
                "numeric": "The :attribute must be at least :min.",
                "string": "The :attribute must be at least :min characters."
            },
            "not_in": "The selected :attribute is invalid.",
            "numeric": "The :attribute must be a number.",
            "present": "The :attribute field must be present.",
            "regex": "The :attribute format is invalid.",
            "required": "The :attribute field is required.",
            "required_if": "The :attribute field is required when :other is :value.",
            "required_unless": "The :attribute field is required unless :other is in :values.",
            "required_with": "The :attribute field is required when :values is present.",
            "required_with_all": "The :attribute field is required when :values is present.",
            "required_without": "The :attribute field is required when :values is not present.",
            "required_without_all": "The :attribute field is required when none of :values are present.",
            "same": "The :attribute and :other must match.",
            "size": {
                "array": "The :attribute must contain :size items.",
                "file": "The :attribute must be :size kilobytes.",
                "numeric": "The :attribute must be :size.",
                "string": "The :attribute must be :size characters."
            },
            "string": "The :attribute must be a string.",
            "timezone": "The :attribute must be a valid zone.",
            "unique": "The :attribute has already been taken.",
            "uploaded": "The :attribute failed to upload.",
            "url": "The :attribute format is invalid."
        },
        "jp.label": 1,
        "vn.label": {
            "Account": {
                "ModalChangeEmail": {
                    "Message": "Nh\u1eadp m\u1eadt kh\u1ea9u \u0111\u1ec3 x\u00e1c nh\u1eadn.",
                    "Password": "M\u1eadt kh\u1ea9u c\u1ee7a b\u1ea1n",
                    "btChangeEmail": "\u0110\u1ed5i email",
                    "newEmail": "Email m\u1edbi"
                },
                "ModalChangePass": {
                    "btChangePass": "\u0110\u1ecfi m\u1eadt kh\u1ea9u",
                    "curPass": "M\u1eadt kh\u1ea9u hi\u1ec7n t\u1ea1i",
                    "newPass": "M\u1eadt kh\u1ea9u m\u1edbi"
                },
                "ModalDeleteAcc": {
                    "Alert": "T\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n s\u1ebd t\u1ef1 \u0111\u1ed9ng \u0111\u01b0\u1ee3c x\u00f3a, b\u1ea1n mu\u1ed1n ti\u1ebfp t\u1ee5c...",
                    "Message": "Nh\u1eadp m\u1eadt kh\u1ea9u \u0111\u1ec3 x\u00e1c nh\u1eadn.",
                    "Password": "M\u1eadt kh\u1ea9u c\u1ee7a b\u1ea1n",
                    "btDeleteAcc": "X\u00f3a t\u00e0i kho\u1ea3n"
                },
                "changeEmail": "\u0110\u1ed5i \u0111\u1ecba ch\u1ec9 email",
                "changePassword": "\u0110\u1ed5i m\u1eadt kh\u1ea9u",
                "deleteAcc": "X\u00f3a t\u00e0i kho\u1ea3n",
                "plan": "My plan"
            },
            "Activities": {
                "activity": "Ho\u1ea1t \u0111\u1ed9ng",
                "addActivities": "Th\u00eam ho\u1ea1t \u0111\u1ed9ng",
                "edit": "Ch\u1ec9nh s\u1eeda ho\u1ea1t \u0111\u1ed9ng",
                "field1": "Ho\u1ea1t \u0111\u1ed9ng (VD: Tham gia gi\u1ecdng h\u00e1t hay to\u00e0n th\u00e0nh)",
                "field2": "Chi ti\u1ebft (VD: Gi\u1ea3i nh\u1ea5t)",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "title": "Ho\u1ea1t \u0111\u1ed9ng"
            },
            "Additional": {
                "a_i": "Th\u00f4ng tin th\u00eam",
                "addAI": "Th\u00eam th\u00f4ng tin",
                "edit": "Ch\u1ec9nh s\u1eeda th\u00f4ng tin th\u00eam",
                "title": "Th\u00f4ng tin th\u00eam"
            },
            "Alert": {
                "AddField": {
                    "fail": "Kh\u00f4ng th\u00eam \u0111\u01b0\u1ee3c",
                    "success": "\u0110\u00e3 th\u00eam"
                },
                "DeleteField": {"fail": "Kh\u00f4ng x\u00f3a \u0111\u01b0\u1ee3c", "success": "\u0110\u00e3 x\u00f3a"},
                "EmailExists": "\u0110\u00e3 c\u00f3",
                "Save": {
                    "fail": "Kh\u00f4ng th\u1ec3 l\u01b0u",
                    "success": "T\u1ea5t c\u1ea3 thay \u0111\u1ed5i \u0111\u01b0\u1ee3c l\u01b0u"
                },
                "cancelButton": "Kh\u00f4ng",
                "confirmButton": "C\u00f3",
                "confirmSave": "L\u01b0u CV ?",
                "copyToClipboard": "\u0110\u00e3 sao ch\u00e9p v\u00e0o b\u1ed9 nh\u1edb \u0111\u1ec7m",
                "errorPass": "L\u1ed7i !!! M\u1eadt kh\u1ea9u kh\u00f4ng h\u1ee3p l\u1ec7",
                "fillEmail": "Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ecba ch\u1ec9 email",
                "fillPass": "Vui l\u00f2ng \u0111i\u1ec1n m\u1eadt kh\u1ea9u",
                "loadTemplateFail": "Kh\u00f4ng th\u1ec3 t\u1ea3i m\u1eabu template",
                "messCancel": "\u0110\u00e3 h\u1ee7y",
                "messChangeEmail": "Email c\u1ee7a b\u1ea1n \u0111\u00e3 thay \u0111\u1ed5i th\u00e0nh c\u00f4ng!",
                "messChangePass": "M\u1eadt kh\u1ea9u c\u1ee7a b\u1ea1n \u0111\u00e3 \u0111\u1ed5i th\u00e0nh c\u00f4ng",
                "messChangeSuccess": "\u0110\u00e3 thay \u0111\u1ed5i th\u00e0nh c\u00f4ng!",
                "messDeleteAcc": "T\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n \u0111\u00e3 x\u00f3a th\u00e0nh c\u00f4ng!",
                "messError": "L\u1ed7i, vui l\u00f2ng th\u1eed l\u1ea1i !",
                "messErrorDownload": "Vui l\u00f2ng l\u01b0u t\u00e0i li\u1ec7u tr\u01b0\u1edbc khi t\u1ea3i v\u1ec1",
                "messSetName": "Vui l\u00f2ng \u0111i\u1ec1n t\u00ean",
                "saveShare": "Vui l\u00f2ng l\u01b0u c\u00e1c thay \u0111\u1ed5i tr\u01b0\u1edbc khi preview.",
                "titleConfirm": "B\u1ea1n c\u00f3 ch\u1eafc?",
                "titleSuccess": "Th\u00e0nh c\u00f4ng!"
            },
            "Awards": {
                "Award": "Gi\u1ea3i th\u01b0\u1edfng",
                "addInterests": "Th\u00eam gi\u1ea3i th\u01b0\u1edfng",
                "edit": "Ch\u1ec9nh s\u1eeda gi\u1ea3i th\u01b0\u1edfng",
                "title": "Gi\u1ea3i th\u01b0\u1edfng"
            },
            "CL": {
                "Copy": "Sao ch\u00e9p",
                "Delete": "X\u00f3a",
                "Download": "T\u1ea3i v\u1ec1",
                "Edit": "S\u1eeda",
                "EditName": "S\u1eeda t\u00ean",
                "ModalChangeName": {"Name": "T\u00ean", "btChangeName": "L\u01b0u", "header": "\u0110\u1ed5i t\u00ean"},
                "ModalCopyCL": {
                    "Alert": "B\u1ea1n c\u00f3 ch\u1eafc ch\u1eafn sao ch\u00e9p?",
                    "btCopyCL": "Sao ch\u00e9p",
                    "header": "Sao ch\u00e9p"
                },
                "ModalCreateCL": {
                    "Lang": "Ng\u00f4n ng\u1eef",
                    "Name": "T\u00ean",
                    "btCreateCL": "T\u1ea1o",
                    "header": "\u0110\u1eb7t t\u00ean",
                    "labelLang": "Ch\u1ecdn ng\u00f4n ng\u1eef b\u1ea1n mu\u1ed1n hi\u1ec3n th\u1ecb trong h\u1ed3 s\u01a1."
                },
                "ModalDeleteCL": {
                    "Alert": "B\u1ea1n c\u00f3 ch\u1eafc ch\u1eafn x\u00f3a?",
                    "btDeleteCL": "X\u00f3a",
                    "header": "X\u00f3a"
                },
                "View": "Xem",
                "columnDownload": "L\u01b0\u1ee3t t\u1ea3i",
                "columnLastModified": "L\u1ea7n ch\u1ec9nh s\u1eeda cu\u1ed1i",
                "columnName": "T\u00ean",
                "columnOptions": "T\u00f9y ch\u1ecdn",
                "columnView": "L\u01b0\u1ee3t xem",
                "compareSalary": "So s\u00e1nh l\u01b0\u01a1ng",
                "createCL": "T\u1ea1o cover letter m\u1edbi"
            },
            "CV": {
                "AlertDownload": "B\u1ea1n ch\u01b0a c\u00f3 b\u1ea3n t\u1ea3i v\u1ec1 cho h\u1ed3 s\u01a1 n\u00e0y.",
                "Copy": "Sao ch\u00e9p",
                "Delete": "X\u00f3a",
                "Download": "T\u1ea3i v\u1ec1",
                "Edit": "S\u1eeda",
                "EditName": "S\u1eeda t\u00ean file",
                "ModalChangeName": {"Name": "T\u00ean", "btChangeName": "L\u01b0u", "header": "\u0110\u1ed5i t\u00ean"},
                "ModalCopyCV": {
                    "Alert": "B\u1ea1n c\u00f3 ch\u1eafc ch\u1eafn mu\u1ed1n sao ch\u00e9p?",
                    "btCopyCV": "Sao ch\u00e9p",
                    "header": "Sao ch\u00e9p"
                },
                "ModalCreateCV": {
                    "Lang": "Ng\u00f4n ng\u1eef",
                    "Name": "T\u00ean",
                    "btCreateCV": "T\u1ea1o",
                    "header": "\u0110\u1eb7t t\u00ean",
                    "labelLang": "Ch\u1ecdn ng\u00f4n ng\u1eef b\u1ea1n mu\u1ed1n hi\u1ec3n th\u1ecb trong h\u1ed3 s\u01a1."
                },
                "ModalDeleteCV": {
                    "Alert": "B\u1ea1n c\u00f3 ch\u1eafn ch\u1eafn mu\u1ed1n x\u00f3a?",
                    "btDeleteCV": "X\u00f3a",
                    "header": "X\u00f3a"
                },
                "View": "Xem",
                "columnDownload": "L\u01b0\u1ee3t t\u1ea3i",
                "columnLastModified": "L\u1ea7n ch\u1ec9nh s\u1eeda cu\u1ed1i",
                "columnName": "T\u00ean",
                "columnOptions": "T\u00f9y ch\u1ecdn",
                "columnView": "L\u01b0\u1ee3t xem",
                "compareSalary": "So s\u00e1nh l\u01b0\u01a1ng",
                "createCV": "T\u1ea1o h\u1ed3 s\u01a1 m\u1edbi"
            },
            "EditorPage": {
                "modeSetting": "C\u00e0i \u0111\u1eb7t c\u01a1 b\u1ea3n",
                "setColor": "C\u00e0i \u0111\u1eb7t m\u00e0u"
            },
            "Education": {
                "School": "Tr\u01b0\u1eddng",
                "TipsEducation": {
                    "Tips1": "N\u1ebfu trong qu\u00e1 tr\u00ecnh h\u1ecdc m\u00e0 b\u1ea1n c\u00f3 \u0111i l\u00e0m th\u00eam 4 n\u0103m th\u00ec n\u00ean khai b\u00e1o trong ph\u1ea7n kinh nghi\u1ec7m l\u00e0m vi\u1ec7c c\u1ee7a b\u1ea1n.",
                    "Tips2": "Th\u00eam v\u00e0o l\u0129nh v\u1ef1c h\u1ecdc t\u1eadp, t\u00ean tr\u01b0\u1eddng \u0111\u1ea1i h\u1ecdc c\u1ee7a b\u1ea1n v\u00e0 x\u1ebfp lo\u1ea1i h\u1ecdc l\u1ef1c. Kh\u00f4ng \u0111\u01b0a th\u00f4ng tin v\u1ec1 tr\u01b0\u1eddng trung h\u1ecdc.",
                    "Tips3": "B\u1ea1n c\u00f3 th\u1ec3 th\u00eam th\u00e0nh t\u00edch h\u1ecdc t\u1eadp n\u1ebfu b\u1ea1n mu\u1ed1n. Nh\u1eefng th\u1ee9 n\u00e0y c\u00f3 th\u1ec3 bao g\u1ed3m h\u1ed3 s\u01a1 h\u1ecdc b\u1ea1, \u0111i\u1ec3m trung b\u00ecnh, h\u1ecdc b\u1ed5ng, gi\u1ea3i th\u01b0\u1edfng, v.v.",
                    "TipsLeft": "M\u1eb9o",
                    "examRight": "H\u1ecdc ng\u00e0nh C\u00f4ng Ngh\u1ec7 Th\u00f4ng Tin, Tr\u01b0\u1eddng \u0110\u1ea1i H\u1ecdc Khoa H\u1ecdc T\u1ef1 Nhi\u00ean TPHCM. ",
                    "examWrong": "Tr\u01b0\u1eddng \u0110\u1ea1i H\u1ecdc Khoa H\u1ecdc T\u1ef1 Nhi\u00ean",
                    "intro": "Th\u00eam v\u00e0o c\u00e1c tr\u01b0\u1eddng \u0111\u1ea1i h\u1ecdc ho\u1eb7c cao \u0111\u1eb3ng m\u00e0 b\u1ea1n \u0111\u00e3 h\u1ecdc. M\u00f4 t\u1ea3 cho nh\u00e0 tuy\u1ec3n d\u1ee5ng c\u00e1c th\u00f4ng tin v\u1ec1 chuy\u00ean ng\u00e0nh c\u1ee7a b\u1ea1n ho\u1eb7c c\u00e1c ho\u1ea1t \u0111\u1ed9ng ngo\u1ea1i kh\u00f3a.",
                    "right": "\u0110\u00fang",
                    "seeLess": "R\u00fat g\u1ecdn",
                    "seeMore": "Xem th\u00eam m\u1eabu",
                    "wrong": "Sai"
                },
                "addSchool": "Th\u00eam tr\u01b0\u1eddng",
                "datefrom": "T\u1eeb",
                "dateto": "\u0110\u1ebfn",
                "description": "Mi\u00eau t\u1ea3",
                "editTitle": "S\u1eeda ti\u00eau \u0111\u1ec1",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "schoolName": "T\u00ean tr\u01b0\u1eddng, b\u1eb1ng c\u1ea5p",
                "title": "H\u1ecdc t\u1eadp",
                "today": "Hi\u1ec7n t\u1ea1i"
            },
            "Experience": {
                "TipsExperience": {
                    "TipsLeft": "M\u1eb9o",
                    "calendar1": "Th\u00e1ng 8 2015 - Hi\u1ec7n t\u1ea1i",
                    "calendar2": "Th\u00e1ng 7 2014 - Th\u00e1ng 7 2015",
                    "com1": "C\u00f4ng ty OneCV",
                    "exam3": "\u0110\u00e0m ph\u00e1n m\u1ed9t k\u1ebf ho\u1ea1ch v\u1edbi c\u00e1c nh\u00e0 cung c\u1ea5p gi\u00fap ti\u1ebft ki\u1ec7m 1.000$ chi ph\u00ed v\u0103n ph\u00f2ng h\u00e0ng n\u0103m.",
                    "exam4": "T\u00f4i \u0111\u00e3 gi\u00fap t\u0103ng sale l\u00ean 50% trong 3 th\u00e1ng.",
                    "exam6": "\"T\u1ed5 ch\u1ee9c,\" \"hu\u1ea5n luy\u1ec7n,\" \"b\u1ed1 tr\u00ed,\" ho\u1eb7c \"ph\u00e2n ph\u1ed1i.\"",
                    "exlist1": "C\u00e1c d\u1ef1 \u00e1n \u0111\u00e3 l\u00e0m",
                    "exlist2": "Th\u00e0nh t\u1ef1u",
                    "intro": "Li\u1ec7t k\u00ea kinh nghi\u1ec7m l\u00e0m vi\u1ec7c c\u1ee7a b\u1ea1n, th\u00eam c\u00e1c v\u1ecb tr\u00ed kh\u00e1c nhau m\u00e0 b\u1ea1n \u0111\u00e3 l\u00e0m v\u00e0 m\u00f4 t\u1ea3 c\u00e1c tr\u00e1ch nhi\u1ec7m c\u1ee7a b\u1ea1n. \u0110\u1eebng qu\u00ean n\u00eau b\u1eadt nh\u1eefng th\u00e0nh t\u1ef1u l\u1edbn nh\u1ea5t c\u1ee7a b\u1ea1n!",
                    "list1": "X\u00e2y d\u1ef1ng v\u00e0 l\u1eadp tr\u00ecnh d\u1ef1 \u00e1n OneCV ph\u1ee5c v\u1ee5 1 tri\u1ec7u ng\u01b0\u1eddi d\u00f9ng. ",
                    "list10": "Tham gia l\u1eadp tr\u00ecnh ki\u1ebfn tr\u00fac microservices cho h\u1ec7 th\u1ed1ng. ",
                    "list2": "Qu\u1ea3n l\u00fd team 5 ng\u01b0\u1eddi x\u00e2y d\u1ef1ng m\u1ea1ng x\u00e3 h\u1ed9i Techtalk.vn",
                    "list3": "Th\u1ef1c hi\u1ec7n chuy\u00ean trang tuy\u1ec3n d\u1ee5ng TopDev.vn ",
                    "list4": "M\u1ea1ng x\u00e3 h\u1ed9i d\u00e0nh cho l\u1eadp tr\u00ecnh vi\u00ean Techtalk.vn c\u00f3 h\u01a1n 1 tri\u1ec7u visit m\u1ed7i th\u00e1ng",
                    "list5": "Tham gia l\u1eadp tr\u00ecnh platform Applancer d\u00e0nh cho c\u00e1c freelancer l\u00e0m \u1ee9ng d\u1ee5ng di \u0111\u1ed9ng",
                    "list6": "X\u00e2y d\u1ef1ng h\u1ec7 th\u1ed1ng chat support Bizicare",
                    "list7": "X\u00e2y d\u1ef1ng CMS b\u00e1o ch\u00ed.",
                    "list8": "N\u00e2ng c\u1ea5p h\u1ec7 th\u1ed1ng d\u00f9ng Mongodb, Redis, RabbitMQ.",
                    "list9": "X\u00e2y d\u1ef1ng h\u1ec7 th\u1ed1ng SSO. ",
                    "pos1": "Senior Developer",
                    "pos2": "Developer",
                    "right": "\u0110\u00fang",
                    "seeLess": "R\u00fat g\u1ecdn",
                    "seeMore": "Xem th\u00eam m\u1eabu",
                    "text1": "B\u1eaft \u0111\u1ea7u v\u1edbi ch\u1ee9c danh hi\u1ec7n t\u1ea1i c\u1ee7a b\u1ea1n, sau \u0111\u00f3 li\u1ec7t k\u00ea t\u1ea5t c\u1ea3 v\u1ecb tr\u00ed \u0111\u00e3 t\u1eebng l\u00e0m tr\u01b0\u1edbc \u0111\u00f3",
                    "text2": "Tr\u00e1nh c\u00e1c m\u00f4 t\u1ea3 d\u00e0i d\u00f2ng, h\u00e3y li\u1ec7t k\u00ea kho\u1ea3n 6-8 \u0111i\u1ec3m nh\u1ea5n trong qu\u00e1 tr\u00ecnh l\u00e0m vi\u1ec7c.",
                    "text3": "L\u00e0m theo c\u00f4ng th\u1ee9c: T\u00f4i gi\u1ea3i quy\u1ebft v\u1ea5n \u0111\u1ec1 X b\u1eb1ng c\u00e1ch th\u1ef1c hi\u1ec7n h\u00e0nh \u0111\u1ed9ng Y d\u1eabn \u0111\u1ebfn Z.",
                    "text4": "Th\u1ec3 hi\u1ec7n s\u1ed1 l\u01b0\u1ee3ng th\u00e0nh t\u00edch c\u1ee7a b\u1ea1n. Kh\u00f4ng \u0111\u01b0a ra th\u00f4ng tin nh\u1ea1y c\u1ea3m.",
                    "text5": "Ch\u1ecdn nh\u1eefng kinh nghi\u1ec7m m\u00e0 b\u1ea1n c\u1ea3m th\u1ea5y ph\u00f9 h\u1ee3p v\u1edbi m\u00f4 t\u1ea3 c\u00f4ng vi\u1ec7c c\u1ee7a nh\u00e0 tuy\u1ec3n d\u1ee5ng. Tr\u00e1nh nh\u01b0ng th\u00f4ng tin kh\u00f4ng quan tr\u1ecdng kh\u00e1c.",
                    "text6": "S\u1eed d\u1ee5ng ng\u00f4n t\u1eeb mang h\u01a1i h\u01b0\u1edbm m\u1ea1nh m\u1ebd \u0111\u1ec3 g\u00e2y \u1ea5n t\u01b0\u1ee3ng v\u1edbi nh\u00e0 tuy\u1ec3n d\u1ee5ng",
                    "title1": "\u01afu ti\u00ean th\u1eddi \u0111i\u1ec3m m\u1edbi nh\u1ea5t",
                    "title2": "T\u00f3m g\u1ecdn nh\u1eefng th\u1eddi \u0111i\u1ec3m quan tr\u1ecdng",
                    "title3": "Th\u00eam th\u00e0nh t\u1ef1u",
                    "title4": "Th\u00eam s\u1ed1 li\u1ec7u th\u00e0nh t\u00edch",
                    "title5": "Th\u1ec3 hi\u1ec7n h\u1ed3 s\u01a1 b\u1ea1n l\u00e0 ph\u00f9 h\u1ee3p nh\u1ea5t",
                    "title6": "T\u1eeb ng\u1eef m\u1ea1nh m\u1ebd"
                },
                "addCompany": "Th\u00eam c\u00f4ng ty",
                "company": "C\u00f4ng ty",
                "datefrom": "T\u1eeb",
                "dateto": "\u0110\u1ebfn",
                "editTitle": "S\u1eeda ti\u00eau \u0111\u1ec1",
                "experience": "Kinh nghi\u1ec7m",
                "line1": "D\u00f2ng 1 (e.g. ch\u1ee9c danh)",
                "line2": "D\u00f2ng 2 (e.g. c\u00f4ng ty, ph\u00f2ng)",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "title": "Kinh nghi\u1ec7m",
                "today": "Hi\u1ec7n t\u1ea1i"
            },
            "ForgotPass": {
                "Email": "\u0110\u1ecba ch\u1ec9 E-Mail",
                "PassConfirm": "X\u00e1c nh\u1eadn m\u1eadt kh\u1ea9u",
                "Password": "M\u1eadt kh\u1ea9u",
                "btResetPass": "G\u1eedi m\u1eadt kh\u1ea9u Reset Link",
                "label": "Qu\u00ean m\u1eadt kh\u1ea9u"
            },
            "Home": {
                "btCreateCV": "T\u1ea1o CV ngay",
                "compareSalary": "So s\u00e1nh l\u01b0\u01a1ng",
                "contentBenefits1": "M\u1eabu th\u01b0 xin vi\u1ec7c c\u1ee7a b\u1ea1n \u0111\u01b0\u1ee3c \u0111\u1ed3ng b\u1ed9 c\u00f9ng v\u1edbi m\u1eabu h\u1ed3 s\u01a1.",
                "contentBenefits2": "Th\u00f4ng tin \u0111\u1ea7y \u0111\u1ee7 c\u00f3 bao nhi\u00eau nh\u00e0 tuy\u1ec3n d\u1ee5ng \u0111ang \u0111\u1ecdc v\u00e0 t\u1ea3i h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n",
                "contentBenefits3": "Ph\u1ea7n m\u1ec1m vi\u1ebft CV c\u1ee7a ch\u00fang t\u00f4i s\u1ebd gi\u00fap b\u1ea1n t\u1ea1o \u0111\u01b0\u1ee3c m\u1ed9t h\u1ed3 s\u01a1 chuy\u00ean nghi\u1ec7p trong v\u00e0i ph\u00fat.",
                "contentBenefits4": "T\u1ea1o \u0111\u1ed3ng th\u1eddi m\u1ed9t h\u1ed3 s\u01a1 k\u00e8m theo th\u01b0 ng\u1ecf hi\u1ec7n \u0111\u1ea1i v\u00e0 \u1ea5n t\u01b0\u1ee3ng.",
                "contentBenefits5": "Nh\u1eefng chuy\u00ean gia tuy\u1ec3n d\u1ee5ng c\u1ee7a ch\u00fang t\u00f4i s\u1ebd h\u01b0\u1edbng d\u1eabn b\u1ea1n vi\u1ebft CV t\u1eebng b\u01b0\u1edbc m\u1ed9t.",
                "contentBenefits6": "B\u1ea1n s\u1ebd \u0111\u01b0\u1ee3c cung c\u1ea5p m\u1ed9t tr\u00ecnh so\u1ea1n th\u1ea3o v\u0103n b\u1ea3n \u0111\u1ec3 t\u00f9y ch\u1ec9nh theo \u00fd mu\u1ed1n.",
                "contentReason1": "C\u00f3 nhi\u1ec1u m\u1eabu h\u1ed3 s\u01a1 chuy\u00ean nghi\u1ec7p, tao nh\u00e3, s\u00e1ng t\u1ea1o ho\u1eb7c hi\u1ec7n \u0111\u1ea1i gi\u00fap b\u1ea1n th\u1ec3 hi\u1ec7n m\u00ecnh v\u1edbi nh\u00e0 tuy\u1ec3n d\u1ee5ng. OneCV cung c\u1ea5p cho b\u1ea1n h\u01a1n 50+ m\u1eabu \u0111\u1ec3 b\u1ea1n s\u1eed d\u1ee5ng v\u00e0 t\u00f9y ch\u1ec9nh theo \u00fd mu\u1ed1n.",
                "contentReason2": "B\u1ea1n kh\u00f4ng c\u00f2n ph\u1ea3i lo l\u1eafng v\u1ec1 vi\u1ec7c l\u00e0m th\u1ebf n\u00e0o \u0111\u1ec3 l\u00e0m m\u1ed9t CV th\u1eadt \u1ea5n t\u01b0\u1ee3ng. Ch\u00fang t\u00f4i c\u00f3 nh\u1eefng g\u1ee3i \u00fd hay t\u1eeb c\u00e1c chuy\u00ean gia nh\u00e2n s\u1ef1 gi\u00fap b\u1ea1n t\u1ea1o h\u1ed3 s\u01a1 t\u1eebng b\u01b0\u1edbc m\u1ed9t, t\u1eeb \u0111\u00f3 gi\u00fap b\u1ea1n \u0111\u01b0\u1ee3c nhi\u1ec1u l\u1eddi m\u1eddi nh\u1eadn ph\u1ecfng v\u1ea5n h\u01a1n.",
                "contentReason3": "T\u1ef1 ch\u1ecdn fonts, size, kho\u1ea3ng c\u00e1ch h\u00e0ng...nh\u01b0 trong word. D\u1ec5 d\u00e0ng, thu\u1eadn ti\u1ec7n v\u00e0 quen thu\u1ed9c.",
                "contentReason4": "Ch\u1ec9 c\u1ea7n v\u00e0i b\u01b0\u1edbc \u0111\u01a1n gi\u1ea3n, v\u00e0i ph\u00fat khai b\u00e1o, v\u1eady l\u00e0 b\u1ea1n \u0111\u00e3 c\u00f3 m\u1ed9t b\u1ed9 h\u1ed3 s\u01a1 xin vi\u1ec7c \u0111\u1ea7y \u0111\u1ee7 \u0111\u1ec3 ti\u1ebfp c\u1eadn nh\u00e0 tuy\u1ec3n d\u1ee5ng.",
                "labelBenefits": "Nh\u1eefng l\u1ee3i \u00edch m\u00e0 OneCV \u0111em \u0111\u1ebfn cho b\u1ea1n",
                "labelReason": "T\u1ea1i sao OneCV l\u00e0 \u1ee9ng d\u1ee5ng t\u1ea1o CV t\u1ed1t nh\u1ea5t?",
                "sologan1": "T\u1ea0O CV ONLINE ",
                "sologan2": "Mi\u1ec5n ph\u00ed m\u00e3i m\u00e3i v\u00e0 s\u1ebd lu\u00f4n nh\u01b0 v\u1eady.",
                "titleBenefits1": "Th\u01b0 xin vi\u1ec7c \u0111\u1ed3ng b\u1ed9",
                "titleBenefits2": "Theo d\u00f5i h\u1ed3 s\u01a1",
                "titleBenefits3": "Nhanh v\u00e0 d\u1ec5 s\u1eed d\u1ee5ng",
                "titleBenefits4": "50+ m\u1eabu CV \u0111\u1eb9p v\u00e0 chuy\u00ean nghi\u1ec7p",
                "titleBenefits5": "Nhi\u1ec1u h\u01b0\u1edbng d\u1eabn vi\u1ebft CV c\u1ee7a chuy\u00ean gia",
                "titleBenefits6": "Tr\u00ecnh so\u1ea1n th\u1ea3o linh \u0111\u1ed9ng",
                "titleReason1": "Cung c\u1ea5p c\u00e1c m\u1eabu h\u1ed3 s\u01a1 chuy\u00ean nghi\u1ec7p",
                "titleReason2": "M\u1eb9o t\u1eeb nh\u00e0 tuy\u1ec3n d\u1ee5ng",
                "titleReason3": "Ch\u1ec9nh s\u1eeda h\u1ed3 s\u01a1 tho\u1ea3i m\u00e1i",
                "titleReason4": "Th\u01b0 xin vi\u1ec7c v\u00e0 h\u1ed3 s\u01a1",
                "trick": "T\u00f4i \u0111\u00e3 t\u00ecm th\u1ea5y m\u1ed9t b\u00e0i vi\u1ebft v\u1ec1 c\u00e1ch vi\u1ebft m\u1ed9t b\u1ea3n l\u00fd l\u1ecbch chuy\u00ean nghi\u1ec7p tr\u00ean Onecv. Sau \u0111\u00f3, t\u00f4i ph\u00e1t hi\u1ec7n ra c\u00e1c \u1ee9ng d\u1ee5ng nay r\u1ea5t d\u1ec5 d\u00f9ng m\u00e0 l\u1ea1i ho\u00e0n to\u00e0n mi\u1ec5n ph\u00ed."
            },
            "Interests": {
                "Interest": "S\u1edf th\u00edch",
                "TipsInterests": {
                    "Tips1": "N\u1ebfu b\u1ea1n c\u00f3 s\u1edf th\u00edch th\u00fa v\u1ecb ho\u1eb7c c\u00f3 li\u00ean quan \u0111\u1ebfn ngh\u1ec1 nghi\u1ec7p c\u1ee7a m\u00ecnh, b\u1ea1n c\u00f3 th\u1ec3 th\u00eam v\u00e0o h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n.",
                    "Tips2": "H\u00e3y t\u00f3m t\u1eaft, ph\u1ea7n n\u00e0y kh\u00f4ng c\u1ea7n nhi\u1ec1u nh\u01b0 nh\u1eefng ph\u1ea7n kh\u00e1c.",
                    "Tips3": "B\u1ea1n c\u00f3 th\u1ec3 th\u00eam v\u00e0o nh\u1eefng th\u00e0nh t\u00edch \u0111\u1ea1t \u0111\u01b0\u1ee3c v\u1edbi nh\u1eefng s\u1edf th\u00edch c\u1ee7a m\u00ecnh, kh\u00f4ng c\u00f3 c\u0169ng kh\u00f4ng sao.",
                    "TipsLeft": "M\u1eb9o",
                    "examRight1": "\u0110\u1ecdc s\u00e1ch, nghe nh\u1ea1c",
                    "examRight2": "Du l\u1ecbch b\u1ee5i",
                    "examWrong": "T\u00f4i l\u00e0 m\u1ed9t ph\u01b0\u1ee3t th\u1ee7 kinh nghi\u1ec7m, \u0111\u00e3 \u0111i t\u1eeb B\u1eafc ch\u00ed Nam. Trong th\u1eddi gian r\u00e3nh r\u1ed7i t\u00f4i th\u01b0\u1eddng hay \u0111\u1ecdc ti\u1ec3u thuy\u1ebft Nguy\u1ec5n Nh\u1eadt \u00c1nh v\u00e0 c\u00e1c nh\u00e0 v\u0103n kh\u00e1c...",
                    "intro": "Tr\u00ecnh b\u00e0y s\u1edf th\u00edch ng\u1eafn g\u1ecdn, ph\u00f9 h\u1ee3p \u0111\u1ec3 g\u00e2y \u1ea5n t\u01b0\u1ee3ng v\u1edbi nh\u00e0 tuy\u1ec3n d\u1ee5ng.",
                    "right": "\u0110\u00fang",
                    "seeLess": "R\u00fat g\u1ecdn",
                    "seeMore": "Xem th\u00eam m\u1eabu",
                    "wrong": "Sai"
                },
                "addSchool": "Th\u00eam s\u1edf th\u00edch",
                "editTitle": "S\u1eeda ti\u00eau \u0111\u1ec1",
                "title": "S\u1edf th\u00edch"
            },
            "Languages": {
                "addLanguages": "Th\u00eam ng\u00f4n ng\u1eef",
                "edit": "Ch\u1ec9nh s\u1eeda ng\u00f4n ng\u1eef",
                "field1": "Ng\u00f4n ng\u1eef (VD: Ti\u1ebfng Anh)",
                "field2": "C\u1ea5p \u0111\u1ed9 (VD: Th\u00f4ng th\u1ea1o)",
                "lang": "Ng\u00f4n ng\u1eef",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "title": "Ng\u00f4n ng\u1eef"
            },
            "LetterContent": {
                "City": "Th\u00e0nh ph\u1ed1, ng\u00e0y ",
                "Content": "N\u1ed9i dung",
                "Recipient": "Ng\u01b0\u1eddi nh\u1eadn",
                "Title": "N\u1ed9i dung th\u01b0 xin vi\u1ec7c"
            },
            "Login": {
                "LabelForgotPass": "Qu\u00ean m\u1eadt kh\u1ea9u?",
                "LabelSignUp": "Ch\u01b0a c\u00f3 t\u00e0i kho\u1ea3n?",
                "LogIn": "\u0110\u0103ng nh\u1eadp",
                "LogInSocial": "Ho\u1eb7c \u0111\u0103ng nh\u1eadp v\u1edbi",
                "btLogin": "\u0110\u0103ng nh\u1eadp ngay",
                "btResetPass": "T\u1ea1o l\u1ea1i m\u1eadt kh\u1ea9u",
                "btSignUp": "\u0110\u0103ng k\u00fd",
                "message_email_exists": "Email \u0111\u00e3 t\u1ed3n t\u1ea1i",
                "message_email_not_update": "Vui l\u00f2ng c\u1eadp nh\u1eadt mail tr\u01b0\u1edbc khi \u0111\u0103ng nh\u1eadp",
                "message_login": "\u0110\u0103ng nh\u1eadp th\u00e0nh c\u00f4ng.",
                "message_login_fail": "Sai email ho\u1eb7c m\u1eadt kh\u1ea9u.",
                "message_logout": "B\u1ea1n \u0111\u00e3 \u0111\u0103ng xu\u1ea5t",
                "message_register": "\u0110\u0103ng k\u00fd th\u00e0nh c\u00f4ng."
            },
            "MenuEditCL": {
                "Download": "T\u1ea3i v\u1ec1",
                "Preview": "Xem tr\u01b0\u1edbc",
                "PreviewCustomize": "Xem tr\u01b0\u1edbc &amp; Ch\u1ec9nh s\u1eeda",
                "ShareCL": "Chia s\u1ebb Cover Letter",
                "editor": "Editor",
                "template": "Template"
            },
            "MenuEditCV": {
                "AddRemoveSecsion": "Th\u00eam &amp; X\u00f3a c\u00e1c m\u1ee5c",
                "Download": "T\u1ea3i v\u1ec1",
                "Preview": "Xem tr\u01b0\u1edbc",
                "PreviewCustomize": "Xem &amp; Ch\u1ec9nh s\u1eeda",
                "Secsions": "M\u1ee5c",
                "ShareCV": "Chia s\u1ebb CV",
                "editor": "Editor",
                "template": "Template"
            },
            "MenuSecsionCL": {
                "contentCL": "N\u1ed9i dung th\u01b0",
                "edit": "Ch\u1ec9nh s\u1eeda",
                "fontfamily": "Font ch\u1eef",
                "fontsize": "C\u1ee1 ch\u1eef",
                "header": "\u0110i\u1ec1n n\u1ed9i dung th\u01b0",
                "linespacing": "C\u00e1ch d\u00f2ng",
                "nameCL": "T\u00ean Cover Letter",
                "personal": "Th\u00f4ng tin c\u00e1 nh\u00e2n",
                "saveCL": "L\u01b0u Cover Letter",
                "setcolor": "Ch\u1ecdn m\u00e0u"
            },
            "MenuSecsionCV": {
                "AddRemove": {"add": "Th\u00eam", "remove": "X\u00f3a"},
                "addSecsion": "Th\u00eam m\u1ee5c",
                "edit": "Ch\u1ec9nh s\u1eeda",
                "education": "H\u1ecdc t\u1eadp",
                "experience": "Kinh nghi\u1ec7m",
                "fontfamily": "Font ch\u1eef",
                "fontsize": "C\u1ee1 ch\u1eef",
                "header": "\u0110i\u1ec1n v\u00e0o h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n",
                "interests": "S\u1edf th\u00edch",
                "linespacing": "C\u00e1ch d\u00f2ng",
                "nameCV": "T\u00ean CV",
                "personal": "Th\u00f4ng tin c\u00e1 nh\u00e2n",
                "saveCV": "L\u01b0u CV",
                "secsionLayout": "Giao di\u1ec7n m\u1ee5c",
                "setcolor": "Ch\u1ecdn m\u00e0u",
                "skills": "K\u1ef9 n\u0103ng",
                "summary": "Gi\u1edbi thi\u1ec7u b\u1ea3n th\u00e2n"
            },
            "Personal": {
                "TipsPersonal": {
                    "TipsLeft": "M\u1eb9o",
                    "contact": "Th\u00f4ng tin li\u00ean h\u1ec7",
                    "contactContent": "Bao g\u1ed3m s\u1ed1 \u0111i\u1ec7n tho\u1ea1i ch\u00ednh v\u00e0 \u0111\u1ecba ch\u1ec9 email c\u1ee7a b\u1ea1n. B\u1ea1n kh\u00f4ng c\u1ea7n ph\u1ea3i cung c\u1ea5p ch\u1ed7 \u1edf c\u1ee7a b\u1ea1n n\u1ebfu nh\u00e0 tuy\u1ec3n d\u1ee5ng kh\u00f4ng y\u00eau c\u1ea7u.",
                    "intro": "Ch\u1ec9 \u0111i\u1ec1n v\u00e0o th\u00f4ng tin b\u1ea1n mu\u1ed1n hi\u1ec3n th\u1ecb trong h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n. \u0110\u1ec3 c\u00e1c tr\u01b0\u1eddng kh\u00e1c tr\u1ed1ng n\u1ebfu b\u1ea1n kh\u00f4ng mu\u1ed1n \u0111i\u1ec1n.",
                    "photo": "\u1ea2nh",
                    "photoContent": "N\u1ebfu b\u1ea1n th\u00eam \u1ea3nh v\u00e0o, b\u1ea1n n\u00ean ch\u1ecdn b\u1ee9c \u1ea3nh \u0111\u01b0\u1ee3c ch\u1ee5p tr\u00ean n\u1ec1n s\u00e1ng, m\u1eb7c trang ph\u1ee5c l\u1ecbch s\u1ef1 v\u00e0 m\u1ed9t n\u1ee5 c\u01b0\u1eddi nh\u1eb9 kh\u00f4ng h\u1edf r\u0103ng l\u00e0 h\u1ee3p l\u00fd. L\u01b0u \u00fd: kh\u00f4ng \u0111\u01b0\u1ee3c th\u00eam \u1ea3nh \u0111\u1eddi th\u01b0\u1eddng ho\u1eb7c b\u1ea1n c\u0169ng c\u00f3 th\u1ec3 kh\u00f4ng c\u1ea7n thi\u1ebft th\u00eam \u1ea3nh n\u1ebfu b\u1ea1n kh\u00f4ng mu\u1ed1n.",
                    "proContent": "Th\u00eam v\u00e0o t\u00ean chuy\u00ean ng\u00e0nh ho\u1eb7c chuy\u00ean m\u00f4n c\u1ee7a b\u1ea1n ph\u00f9 h\u1ee3p v\u1edbi v\u1ecb tr\u00ed m\u00e0 b\u1ea1n mu\u1ed1n n\u1ed9p \u0111\u01a1n. N\u00f3 s\u1ebd xu\u1ea5t hi\u1ec7n b\u00ean d\u01b0\u1edbi t\u00ean c\u1ee7a b\u1ea1n v\u00e0 gi\u00fap cho nh\u00e0 tuy\u1ec3n d\u1ee5ng c\u00f3 th\u1ec3 nh\u1eadn \u0111\u1ecbnh nhanh \u0111\u01b0\u1ee3c h\u1ed3 s\u01a1.",
                    "profession": "Chuy\u00ean m\u00f4n",
                    "right": "\u0110\u00fang",
                    "seeLess": "R\u00fat ng\u1eafn",
                    "seeMore": "Xem th\u00eam m\u1eb9o v\u00e0 m\u1eabu",
                    "social": "Social media",
                    "socialContent": "B\u1ea1n c\u00f3 th\u1ec3 th\u00eam v\u00e0o link website c\u00e1 nh\u00e2n, m\u1ea1ng x\u00e3 h\u1ed9i \u0111\u1ec3 t\u0103ng th\u00eam tin t\u01b0\u1edfng v\u00e0 gi\u00fap nh\u00e0 tuy\u1ec3n d\u1ee5ng hi\u1ec3u r\u00f5 b\u1ea1n h\u01a1n.",
                    "wrong": "Sai"
                },
                "addField": "Th\u00eam tr\u01b0\u1eddng m\u1edbi",
                "address": "\u0110\u1ecba ch\u1ec9",
                "citizenship": "Th\u01b0\u1eddng tr\u00fa",
                "dateofbirth": "Ng\u00e0y sinh",
                "delete": "X\u00f3a",
                "editTitle": "S\u1eeda ti\u00eau \u0111\u1ec1",
                "email": "E-mail",
                "firstname": "T\u00ean",
                "lastname": "H\u1ecd",
                "linkedin": "LinkedIn",
                "marital": "T\u00ecnh tr\u1ea1ng h\u00f4n nh\u00e2n",
                "phone": "\u0110i\u1ec7n tho\u1ea1i",
                "placeofbirth": "N\u01a1i sinh",
                "profession": "Chuy\u00ean m\u00f4n",
                "title": "Th\u00f4ng tin c\u00e1 nh\u00e2n",
                "twitter": "Twitter",
                "www": "WWW"
            },
            "Projects": {
                "addProjects": "Th\u00eam D\u1ef1 \u00e1n",
                "edit": "Ch\u1ec9nh s\u1eeda d\u1ef1 \u00e1n",
                "project": "D\u1ef1 \u00e1n",
                "title": "D\u1ef1 \u00e1n"
            },
            "References": {
                "addReferences": "Th\u00eam ng\u01b0\u1eddi tham kh\u1ea3o",
                "edit": "Ch\u1ec9nh s\u1eeda ng\u01b0\u1eddi tham kh\u1ea3o",
                "field1": "H\u1ecd T\u00ean",
                "field2": "Ch\u1ee9c v\u1ee5",
                "field3": "S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",
                "field4": "Email",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "reference": "Ng\u01b0\u1eddi tham kh\u1ea3o",
                "title": "Ng\u01b0\u1eddi tham kh\u1ea3o"
            },
            "Register": {
                "LabelForgotPass": "Qu\u00ean m\u1eadt kh\u1ea9u?",
                "LabelLogIn": "\u0110\u00e3 c\u00f3 t\u00e0i kho\u1ea3n?",
                "Login": "\u0110\u0103ng nh\u1eadp",
                "SignUp": "\u0110\u0103ng k\u00fd",
                "btResetPass": "T\u1ea1o l\u1ea1i m\u1eadt kh\u1ea9u",
                "terms": "Khi \u0111\u0103ng k\u00fd, b\u1ea1n \u0111\u1ed3ng \u00fd v\u1edbi"
            },
            "ShareCL": {
                "btPreview": "Xem tr\u01b0\u1edbc",
                "btSave": "L\u01b0u",
                "content1": "T\u1ea1o li\u00ean k\u1ebft c\u00e1 nh\u00e2n \u0111\u1ebfn th\u01b0 xin vi\u1ec7c.",
                "content2": "Nh\u00e0 tuy\u1ec3n d\u1ee5ng c\u00f3 th\u1ec3 \u0111\u1ecdc v\u00e0 t\u1ea3i.",
                "content3": "Theo d\u00f5i xem c\u00f3 bao nhi\u00eau nh\u00e0 tuy\u1ec3n d\u1ee5ng xem v\u00e0 t\u1ea3i.",
                "header1": "Chia s\u1ebb h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n",
                "header2": "G\u1eedi th\u01b0 xin vi\u1ec7c",
                "header3": "Theo d\u00f5i th\u01b0",
                "link": "Vui l\u00f2ng l\u01b0u s\u1ef1 thay \u0111\u1ed5i tr\u01b0\u1edbc khi xem l\u1ea1i.",
                "title": "Chia s\u1ebb cover letter"
            },
            "ShareCV": {
                "btPreview": "Xem tr\u01b0\u1edbc",
                "btSave": "L\u01b0u",
                "content1": "T\u1ea1o li\u00ean k\u1ebft c\u00e1 nh\u00e2n \u0111\u1ebfn h\u1ed3 s\u01a1",
                "content2": "Nh\u00e0 tuy\u1ec3n d\u1ee5ng c\u00f3 th\u1ec3 xem v\u00e0 t\u1ea3i h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n.",
                "content3": "Theo d\u00f5i xem c\u00f3 bao nhi\u00eau nh\u00e0 tuy\u1ec3n d\u1ee5ng xem v\u00e0 t\u1ea3i h\u1ed3 s\u01a1.",
                "header1": "Chia s\u1ebb h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n",
                "header2": "G\u1eedi \u0111\u01b0\u1eddng d\u1eabn h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n",
                "header3": "Theo d\u00f5i h\u1ed3 s\u01a1",
                "link": "Vui l\u00f2ng l\u01b0u s\u1ef1 thay \u0111\u1ed5i tr\u01b0\u1edbc khi xem l\u1ea1i.",
                "title": "Chia s\u1ebb CV"
            },
            "Skills": {
                "Skill": "K\u1ef9 n\u0103ng",
                "TipsSkills": {
                    "Tips1": "N\u00ean \u0111\u1eb7t ph\u1ea7n k\u1ef9 n\u0103ng v\u00e0o ph\u1ea7n \u0111\u1ea7u trang 1.",
                    "Tips2": "Khai b\u00e1o c\u00e1c k\u1ef9 n\u0103ng ph\u00f9 h\u1ee3p v\u1edbi m\u00f4 t\u1ea3 c\u00f4ng vi\u1ec7c, c\u00e1c k\u1ef9 n\u0103ng quan tr\u1ecdng n\u00ean \u0111\u1ec3 l\u00ean \u0111\u1ea7u. ",
                    "Tips3": "S\u1eed d\u1ee5ng s\u1ed1 li\u1ec7u v\u00e0 d\u1eef ki\u1ec7n quan tr\u1ecdng, VD: Php 5 n\u0103m kinh nghi\u1ec7m.",
                    "Tips4": "M\u00f4 t\u1ea3 k\u1ef9 c\u1ea5p \u0111\u1ed9 c\u1ee7a k\u1ef9 n\u0103ng ho\u1eb7c s\u1eed d\u1ee5ng b\u1ea3ng \u0111\u00e1nh gi\u00e1. ",
                    "Tips5": "S\u1eed d\u1ee5ng b\u1ea3ng \u0111\u00e1nh gi\u00e1 (rating) n\u1ebfu b\u1ea1n mu\u1ed1n hi\u1ec3n th\u1ecb m\u1ee9c \u0111\u1ed9 k\u1ef9 n\u0103ng c\u1ee7a b\u1ea1n b\u1eb1ng Infographic. \u0110\u00e1nh gi\u00e1 k\u1ef9 n\u0103ng c\u1ee7a b\u1ea1n t\u1eeb 1 \u0111\u1ebfn 5.",
                    "TipsLeft": "M\u1eb9o",
                    "com1": "Xu\u1ea5t s\u1eafc",
                    "com3": "Xu\u1ea5t s\u1eafc",
                    "examRightContent": "5+ n\u0103m kinh nghi\u1ec7m l\u00e0m vi\u1ec7c v\u1edbi c\u00e1c h\u1ec7 th\u1ed1ng l\u1edbn.",
                    "examRightTitle": "Php",
                    "examWrong": "Php, Mysql",
                    "intro": "Th\u1ec3 hi\u1ec7n cho nh\u00e0 tuy\u1ec3n d\u1ee5ng nh\u1eefng g\u00ec b\u1ea1n c\u00f3 th\u1ec3 l\u00e0m. Th\u00eam c\u00e1c k\u1ef9 n\u0103ng m\u1ec1m kh\u00e1c nhau nh\u01b0 \"Gi\u1ea3i quy\u1ebft v\u1ea5n \u0111\u1ec1\" ho\u1eb7c \"Microsoft Word\" \u0111\u1ec3 gi\u1edbi thi\u1ec7u kh\u1ea3 n\u0103ng c\u1ee7a b\u1ea1n.",
                    "pos1": "Php (5 sao)",
                    "pos2": "Javascript",
                    "pos3": "Mysql (5 sao)",
                    "pos4": "Laravel PHP framework (4 sao)",
                    "right": "\u0110\u00fang",
                    "seeLess": "R\u00fat g\u1ecdn",
                    "seeMore": "Xem th\u00eam m\u1eabu",
                    "wrong": "Sai"
                },
                "addSkills": "Th\u00eam k\u1ef9 n\u0103ng",
                "editTitle": "S\u1eeda ti\u00eau \u0111\u1ec1",
                "field1": "K\u1ef9 n\u0103ng (VD: Php)",
                "field2": "C\u1ea5p \u0111\u1ed9 (VD: Xu\u1ea5t s\u1eafc)",
                "field3": "\u0110\u00e1nh gi\u00e1 ",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "title": "Nh\u1eefng k\u1ef9 n\u0103ng"
            },
            "Summary": {
                "TipsSummary": {
                    "TipsLeft": "M\u1eb9o",
                    "content1": "B\u1eaft \u0111\u1ea7u v\u1edbi ch\u1ee9c danh chuy\u00ean m\u00f4n trong t\u00f3m t\u1eaft s\u01a1 y\u1ebfu l\u00fd l\u1ecbch \u0111\u1ec3 nh\u00e0 tuy\u1ec3n d\u1ee5ng c\u00f3 th\u1ec3 nh\u1eadn \u0111\u1ecbnh nhanh v\u1ec1 h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n.",
                    "content2": "Th\u00eam v\u00e0o s\u1ed1 li\u1ec7u v\u00e0 k\u1ebft qu\u1ea3. T\u1eadp trung v\u00e0o k\u1ebft qu\u1ea3 th\u1ec3 hi\u1ec7n b\u1ea1n th\u1ef1c s\u1ef1 n\u1ed5i b\u1eadt v\u00e0 ch\u1ee9ng minh m\u00ecnh l\u00e0 \u1ee9ng c\u1eed vi\u00ean h\u00e0ng \u0111\u1ea7u.",
                    "content3": "T\u00ecm c\u00e1c t\u1eeb kho\u00e1 t\u1eeb b\u1ea3n m\u00f4 t\u1ea3 c\u00f4ng vi\u1ec7c, bao g\u1ed3m c\u00e1c k\u1ef9 n\u0103ng v\u00e0 b\u1ea3n ch\u1ea5t (t\u1eadn t\u00e2m, ch\u0103m ch\u1ec9) v\u00e0 th\u00eam ch\u00fang v\u00e0o b\u1ea3n t\u00f3m t\u1eaft h\u1ed3 s\u01a1 c\u1ee7a b\u1ea1n.",
                    "content4": "V\u1edbi kinh nghi\u1ec7m 5 n\u0103m l\u00e0m qu\u1ea3n l\u00fd s\u1ea3n c\u00f9ng v\u1edbi vi\u1ec7c qu\u1ea3n l\u00fd c\u00e1c nh\u00f3m l\u00e0m ph\u1ea7n m\u1ec1m h\u01a1n 20 nh\u00e2n s\u1ef1. S\u1eed d\u1ee5ng c\u00e1c c\u00f4ng c\u1ee5 qu\u1ea3n l\u00fd giao vi\u1ec7c c\u0169ng nh\u01b0 theo d\u00f5i ti\u1ebfn \u0111\u1ed9 ph\u00e1t tri\u1ec3n s\u1ea3n ph\u1ea9m nh\u01b0 Slack, Telegram, Trello, Atlassian. Thi\u1ebft k\u1ebf v\u00e0 x\u00e2y d\u1ef1ng ki\u1ebfn tr\u00fac \u0111\u00e1p \u1ee9ng truy c\u1eadp cao.",
                    "content5": "L\u00e0m vi\u1ec7c v\u1edbi ng\u00f4n ng\u1eef Php v\u1edbi h\u01a1n 5 n\u0103m kinh nghi\u1ec7m. Ngo\u00e0i ra s\u1eed d\u1ee5ng nhu\u1ea7n nhuy\u1ec5n c\u00e1c ng\u00f4n ng\u1eef kh\u00e1c nh\u01b0 Javascript, h\u1ec7 c\u01a1 s\u1edf qu\u1ea3n l\u00fd d\u1eef li\u1ec7u nh\u01b0 Mysql, MongoDB v\u00e0 Redis cache.",
                    "content6": "T\u1eebng qu\u1ea3n l\u00fd nhi\u1ec1u fanpage v\u1edbi h\u01a1n 2 tri\u1ec7u ng\u01b0\u1eddi d\u00f9ng, l\u1eadp c\u00e1c k\u1ebf ho\u1ea1ch ti\u1ebfp th\u1ecb c\u0169ng nh\u01b0 content thu h\u00fat ng\u01b0\u1eddi d\u00f9ng t\u01b0\u01a1ng t\u00e1c. Th\u1ef1c hi\u1ec7n c\u00e1c event cho c\u00f4ng ty c\u0169ng nh\u01b0 kh\u00e1ch h\u00e0ng v\u1edbi h\u00e0ng ngh\u00ecn ng\u01b0\u1eddi tham d\u1ef1. Theo d\u00f5i c\u00e1c th\u00f4ng s\u1ed1 v\u00e0 report \u0111\u1ec3 d\u1ef1 b\u00e1o, \u0111\u00e1nh gi\u00e1 k\u1ebf ho\u1ea1ch ti\u1ebfp th\u1ecb.",
                    "content7": "\u0110\u1ea3m nhi\u1ec7m thi\u1ebft k\u1ebf web, banner, backdrop...ch\u00ednh t\u1ea1i c\u00f4ng ty OneCV. S\u1eed d\u1ee5ng th\u1ea3nh th\u1ea1o Sketch, PS, AI cho c\u00e1c d\u1ef1 \u00e1n. C\u00f3 n\u0103ng khi\u1ebfu v\u1ec1 v\u1ebd v\u00e0 m\u1ef9 thu\u1eadt.",
                    "content8": "V\u1eeba t\u1ed1t nghi\u1ec7p lo\u1ea1i gi\u1ecfi t\u1ea1i tr\u01b0\u1eddng \u0110H KHTN, \u0111\u00e3 th\u1ef1c t\u1eadp t\u1ea1i c\u00f4ng ty OneCV v\u00e0 \u0111\u01b0\u1ee3c \u0111\u00e1nh gi\u00e1 l\u00e0 t\u1ed1t. H\u00f2a \u0111\u1ed3ng, vui v\u1ebb, th\u00e2n thi\u1ec7n v\u1edbi \u0111\u1ed3ng nghi\u1ec7p.",
                    "exam1": "Marketing Manager v\u1edbi 5+ kinh nghi\u1ec7m.",
                    "exam2": "T\u0103ng doanh s\u1ed1 th\u00eam 150% sau 3 th\u00e1ng.",
                    "exam3": "H\u01b0\u1edbng ngo\u1ea1i, chuy\u00ean nghi\u1ec7p, y\u00eau th\u00edch v\u00e0 h\u00f2a \u0111\u1ed3ng trong vi\u1ec7c x\u00e2y d\u1ef1ng c\u00e1c m\u1ed1i quan h\u1ec7 trong c\u00f4ng vi\u1ec7c",
                    "header1": "B\u1eaft \u0111\u1ea7u v\u1edbi ch\u1ee9c danh chuy\u00ean m\u00f4n c\u1ee7a b\u1ea1n",
                    "header2": "Th\u00eam 2 ho\u1eb7c 3 th\u00e0nh t\u1ef1u \u0111\u1ea1t \u0111\u01b0\u1ee3c",
                    "header3": "Th\u1ec3 hi\u1ec7n m\u00ecnh ph\u00f9 h\u1ee3p v\u1edbi c\u00f4ng vi\u1ec7c",
                    "header4": "V\u00ed d\u1ee5: T\u00f3m t\u1eaft h\u1ed3 s\u01a1 m\u1eabu cho Product Manager",
                    "header5": "V\u00ed d\u1ee5: T\u00f3m t\u1eaft h\u1ed3 s\u01a1 m\u1eabu cho Developer",
                    "header6": "V\u00ed d\u1ee5: T\u00f3m t\u1eaft h\u1ed3 s\u01a1 m\u1eabu cho Marketing",
                    "header7": "V\u00ed d\u1ee5: T\u00f3m t\u1eaft h\u1ed3 s\u01a1 m\u1eabu cho Designer",
                    "header8": "V\u00ed d\u1ee5: T\u00f3m t\u1eaft h\u1ed3 s\u01a1 m\u1eabu cho sinh vi\u00ean",
                    "intro": "B\u1ea3n t\u00f3m t\u1eaft s\u01a1 y\u1ebfu l\u00fd l\u1ecbch l\u00e0 ph\u1ea7n gi\u1edbi thi\u1ec7u ng\u1eafn v\u00e0 d\u1ec5 hi\u1ec3u l\u00e0m n\u1ed5i b\u1eadt c\u00e1c qu\u00e1 tr\u00ecnh ngh\u1ec1 nghi\u1ec7p, th\u00e0nh t\u00edch v\u00e0 k\u1ef9 n\u0103ng c\u1ee7a b\u1ea1n.",
                    "right": "\u0110\u00fang",
                    "seeLess": "R\u00fat g\u1ecdn",
                    "seeMore": "Xem m\u1eb9o & m\u1eabu"
                },
                "editTitle": "S\u1eeda ti\u00eau \u0111\u1ec1",
                "optional": "(kh\u00f4ng b\u1eaft bu\u1ed9c)",
                "summary": "T\u00f3m t\u1eaft",
                "title": "T\u00f3m t\u1eaft"
            },
            "btCancel": "H\u1ee7y",
            "lang": {"en": "English", "jp": "\u65e5\u672c\u8a9e", "vn": "Ti\u1ebfng Vi\u1ec7t"},
            "login": "\u0110\u0103ng nh\u1eadp",
            "logout": "Tho\u00e1t",
            "menuBlog": {
                "allPosts": "T\u1ea5t c\u1ea3 b\u00e0i vi\u1ebft",
                "coverLetter": "Th\u01b0 xin vi\u1ec7c",
                "jobInterview": "Ph\u1ecfng v\u1ea5n",
                "jobSearch": "T\u00ecm ki\u1ebfm vi\u1ec7c",
                "resumeExamples": "H\u1ed3 s\u01a1 m\u1eabu",
                "resumeWriting": "C\u00e1ch vi\u1ebft h\u1ed3 s\u01a1"
            },
            "menuHome": {
                "about": "V\u1ec1 ch\u00fang t\u00f4i",
                "autodownload": "CV s\u1ebd \u0111\u01b0\u1ee3c t\u1ef1 \u0111\u1ed9ng t\u1ea3i xu\u1ed1ng sau:",
                "autosave": "Th\u00f4ng tin s\u1ebd \u0111\u01b0\u1ee3c t\u1ef1 \u0111\u1ed9ng l\u01b0u sau",
                "contact": "Li\u00ean h\u1ec7",
                "help": "H\u1ed7 tr\u1ee3",
                "helpCenter": "H\u1ed7 tr\u1ee3",
                "pricing": "B\u1ea3ng gi\u00e1"
            },
            "menuUser": {
                "Rewards": "Get Rewards",
                "account": "T\u00e0i kho\u1ea3n",
                "manageCL": "Qu\u1ea3n l\u00fd Cover Letter",
                "manageCV": "Qu\u1ea3n l\u00fd CV"
            },
            "privacy": "Ch\u00ednh s\u00e1ch b\u1ea3o m\u1eadt",
            "register": "\u0110\u0103ng k\u00fd",
            "reserved": "All rights reserved.",
            "termsofservice": "\u0110i\u1ec1u kho\u1ea3n d\u1ecbch v\u1ee5"
        }
    });
})();
