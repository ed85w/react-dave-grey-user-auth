import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; //must start with upper or lower case letter, followed by 3 to 23 other letters/numbers/_s/-s
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //at least 1 upper case letter, 1 lower case letter, 1 number, 1 special character. 8 to 24 long

const Register = () => {
  const userRef = useRef(); //used to set focus of input fields
  const errRef = useRef(); //used for screen reader, accessibility

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //focus on username input
  useEffect(() => {
    userRef.current.focus(); 
  }, []) // only on load

  //validate user name
  useEffect(()=>{
    const result = USER_REGEX.test(user);
    console.log("useEffect username validate")
    console.log("result " + result);
    console.log("user " + user);
    setValidName(result);
  }, [user]) //on load and if user changes

  // validate password 
  useEffect(()=>{
    const result = USER_REGEX.test(pwd);
    console.log("useEffect password validate")
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd; //check password is equal to match password
    setValidMatch(match);
  },[pwd, matchPwd])

  // used to clear any error message when user, pwd or matchPwg change (assumes any msg has been read)
  useEffect(()=>{
    console.log("useEffect errmsg")
    setErrMsg('')
  },[user, pwd, matchPwd])

  return ( 
    <section>
      <p
        ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
        aria-live="assertive" //aria-live="assertive" means it will be read out by screen reader when focussed
        >{errMsg}
      </p>
      <h1>Register</h1>
      <form >
        <label htmlFor="username">
            Username:
            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
        </label>
        <input
            type="text"
            id="username"
            ref={userRef} //focus on component load
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)} //when user leaves
        />
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
        </p>


        <label htmlFor="password">
            Password:
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
        </label>
        <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)} 
            onBlur={() => setPwdFocus(false)} 
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>


        <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
        </label>
        <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
        </p>

        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
    </form>
    </section>
   );
}
 
export default Register;