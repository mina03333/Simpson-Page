document.addEventListener('DOMContentLoaded', function () {
    console.log("singup");
    blurCheck();
});

function blurCheck() {
    console.log("blurCheck");
    const pwdCheck = document.querySelector("#pwdCheck");
    pwdCheck.onblur = function () {
        //비밀번호 두 개가 다르다면
        if (pwd.value !== pwdCheck.value) {
            alert("Password doesn't match.");
            pwd.value = "";
            pwdCheck.value = "";
            pwd.focus();
        }
    }

    const ldbMembers = JSON.parse(localStorage.getItem("ldbMembers"));
    console.log(ldbMembers);
    if (ldbMembers !== null) {
        email.onblur = function () {
            ldbMembers.forEach(function (item) {
                //중복 아이디가 있다면
                if (email.value == item['email']) {
                    alert("ID already exists.");
                    email.value = "";
                    email.focus();
                }
            });
        }
    }
}

function signupValidate() {
    const userName = document.querySelector("#userName");
    const email = document.querySelector("#email");
    const pwd = document.querySelector("#pwd");
    var pwdCheck = document.querySelector("#pwdCheck");

    //1.이름 검사
    //한글로만 2자 이상
    let regExp = /^[a-z][a-z]{0,2}[a-z]$/;
    if (!regExpTest(regExp, userName, "Not a valid username, please use another username.")) {
        return false;
    }
    //2.이메일 검사
    regExp = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    if (!regExpTest(regExp, email, "Not a valid email, please use another email.")) {
        return false;
    }

    //3.비밀번호 검사
    //8~20자, 최소 1개의 숫자/특수문자 포함
    regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
    if (!regExpTest(regExp, pwd, "Not a valid password, please use another password. (numbers, 8-20, special cases)")) {
        pwdCheck.value = "";
        return false;
    }

    //4.비밀번호 확인
    if (pwd.value !== pwdCheck.value) {
        console.log(pwd.value);
        console.log(pwdCheck.value);
        alert("Password doesn't match.");
        return false;
    }

    //유효성 검사에 전부 통과한 후 회원정보 저장
    const ldbMem = {
        userName: userName.value.trim(),
        email: email.value.trim(),
        pwd: pwd.value.trim()
    }
    let ldbMembers = JSON.parse(localStorage.getItem("ldbMembers"));

    if (ldbMembers == null) ldbMembers = [];
    ldbMembers.push(ldbMem);

    var jsonStr = JSON.stringify(ldbMembers);
    localStorage.setItem("ldbMembers", jsonStr);

    //폼 초기화
    reset();

    //회원가입 폼 제출
    history.back();
    return true;
}

function reset() {
    userName.value = "";
    email.value = "";
    pwd.value = "";
    pwdCheck.value = "";
}

function regExpTest(regExp, elem, msg) {
    if (regExp.test(elem.value)) return true;
    else {
        alert(msg);
        elem.value = "";
        elem.focus();
        return false;
    }
}







