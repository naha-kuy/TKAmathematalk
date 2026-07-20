import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import gsap from 'gsap'
import './Login.css'

function EyeOpen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function EyeClosed() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)
  const gsapRef = useRef({})

  useEffect(() => {
    gsap.registerPlugin(window.MorphSVGPlugin)
    const c = formRef.current
    if (!c) return

    const username = c.querySelector('#loginUsername')
    const pwd = c.querySelector('#loginPassword')
    const svg = c.querySelector('.svgContainer')
    const twoF = c.querySelector('.twoFingers')
    const aL = c.querySelector('.armL'), aR = c.querySelector('.armR')
    const eL = c.querySelector('.eyeL'), eR = c.querySelector('.eyeR')
    const nose = c.querySelector('.nose'), mouth = c.querySelector('.mouth')
    const mBG = c.querySelector('.mouthBG'), mSBG = c.querySelector('.mouthSmallBG')
    const mMBG = c.querySelector('.mouthMediumBG'), mLBG = c.querySelector('.mouthLargeBG')
    const mMP = c.querySelector('#mouthMaskPath'), mOut = c.querySelector('.mouthOutline')
    const tooth = c.querySelector('.tooth'), tongue = c.querySelector('.tongue')
    const chin = c.querySelector('.chin'), face = c.querySelector('.face')
    const eb = c.querySelector('.eyebrow'), oeL = c.querySelector('.earL .outerEar')
    const oeR = c.querySelector('.earR .outerEar'), ehL = c.querySelector('.earL .earHair')
    const ehR = c.querySelector('.earR .earHair'), hair = c.querySelector('.hair')
    const bBG = c.querySelector('.bodyBGnormal'), bBGc = c.querySelector('.bodyBGchanged')
    const toggleBtn = c.querySelector('#showPasswordToggle')

    let activeEl, ci, sc, svgC, inputC, inputScrollWidth, chinM = .5, dFC, mStatus = 'small', blink, eyeS = 1, eyesC = false, spC = false
    let eLC, eRC, nC, mC, eLA, eLX, eLY, eRA, eRX, eRY, nA, nX, nY, mA, mX, mY, mR, chX, chY, chS, fX, fY, fSk, ebSk, oeX, oeY, hX, hS

    function gAngle(x1,y1,x2,y2) { return Math.atan2(y1-y2, x1-x2) }
    function gPos(el) {
      let x=0,y=0
      while (el) {
        if (el.tagName === 'BODY') { x += el.offsetLeft - (el.scrollLeft||document.documentElement.scrollLeft) + el.clientLeft; y += el.offsetTop - (el.scrollTop||document.documentElement.scrollTop) + el.clientTop }
        else { x += el.offsetLeft - el.scrollLeft + el.clientLeft; y += el.offsetTop - el.scrollTop + el.clientTop }
        el = el.offsetParent
      }
      return {x,y}
    }
    function gRand(m) { return Math.floor(Math.random()*m) }
    function calcFace() {
      const cp = username.selectionEnd ?? username.value.length
      const d = document.createElement('div'), s = document.createElement('span')
      const cs = getComputedStyle(username)
      for (const p of cs) d.style[p] = cs[p]
      d.style.position = 'absolute'
      document.body.appendChild(d)
      d.textContent = username.value.substr(0, cp)
      s.textContent = username.value.substr(cp)||'.'
      d.appendChild(s)
      const crd = gPos(s)
      if (username.scrollWidth <= inputScrollWidth) {
        dFC = sc - (crd.x + inputC.x)
        eLA = gAngle(eLC.x, eLC.y, inputC.x + crd.x, inputC.y + 25)
        eRA = gAngle(eRC.x, eRC.y, inputC.x + crd.x, inputC.y + 25)
        nA = gAngle(nC.x, nC.y, inputC.x + crd.x, inputC.y + 25)
        mA = gAngle(mC.x, mC.y, inputC.x + crd.x, inputC.y + 25)
      } else {
        eLA = gAngle(eLC.x, eLC.y, inputC.x + inputScrollWidth, inputC.y + 25)
        eRA = gAngle(eRC.x, eRC.y, inputC.x + inputScrollWidth, inputC.y + 25)
        nA = gAngle(nC.x, nC.y, inputC.x + inputScrollWidth, inputC.y + 25)
        mA = gAngle(mC.x, mC.y, inputC.x + inputScrollWidth, inputC.y + 25)
      }
      eLX = Math.cos(eLA)*20; eLY = Math.sin(eLA)*10
      eRX = Math.cos(eRA)*20; eRY = Math.sin(eRA)*10
      nX = Math.cos(nA)*23; nY = Math.sin(nA)*10
      mX = Math.cos(mA)*23; mY = Math.sin(mA)*10; mR = Math.cos(mA)*6
      chX = mX*.8; chY = mY*.5
      chS = 1-((dFC*.15)/100); if (chS>1) { chS=1-(chS-1); if (chS<chinM) chS=chinM }
      fX = mX*.3; fY = mY*.4; fSk = Math.cos(mA)*5; ebSk = Math.cos(mA)*25
      oeX = Math.cos(mA)*4; oeY = Math.cos(mA)*5; hX = Math.cos(mA)*6; hS = 1.2
      gsap.to(eL,1,{x:-eLX,y:-eLY,ease:'expo.out'})
      gsap.to(eR,1,{x:-eRX,y:-eRY,ease:'expo.out'})
      gsap.to(nose,1,{x:-nX,y:-nY,rotation:mR,transformOrigin:'center center',ease:'expo.out'})
      gsap.to(mouth,1,{x:-mX,y:-mY,rotation:mR,transformOrigin:'center center',ease:'expo.out'})
      gsap.to(chin,1,{x:-chX,y:-chY,scaleY:chS,ease:'expo.out'})
      gsap.to(face,1,{x:-fX,y:-fY,skewX:-fSk,transformOrigin:'center top',ease:'expo.out'})
      gsap.to(eb,1,{x:-fX,y:-fY,skewX:-ebSk,transformOrigin:'center top',ease:'expo.out'})
      gsap.to(oeL,1,{x:oeX,y:-oeY,ease:'expo.out'})
      gsap.to(oeR,1,{x:oeX,y:oeY,ease:'expo.out'})
      gsap.to(ehL,1,{x:-oeX,y:-oeY,ease:'expo.out'})
      gsap.to(ehR,1,{x:-oeX,y:oeY,ease:'expo.out'})
      gsap.to(hair,1,{x:hX,scaleY:hS,transformOrigin:'center bottom',ease:'expo.out'})
      document.body.removeChild(d)
    }
    function onUserI() {
      calcFace()
      const v = username.value; ci = v.length
      if (ci>0) {
        if (mStatus==='small') {
          mStatus='medium'
          gsap.to([mBG,mOut,mMP],1,{morphSVG:mMBG,shapeIndex:8,ease:'expo.out'})
          gsap.to(tooth,1,{x:0,y:0,ease:'expo.out'})
          gsap.to(tongue,1,{x:0,y:1,ease:'expo.out'})
          gsap.to([eL,eR],1,{scaleX:.85,scaleY:.85,ease:'expo.out'})
          eyeS=.85
        }
        if (v.includes('@')) {
          mStatus='large'
          gsap.to([mBG,mOut,mMP],1,{morphSVG:mLBG,ease:'expo.out'})
          gsap.to(tooth,1,{x:3,y:-2,ease:'expo.out'})
          gsap.to(tongue,1,{y:2,ease:'expo.out'})
          gsap.to([eL,eR],1,{scaleX:.65,scaleY:.65,ease:'expo.out',transformOrigin:'center center'})
          eyeS=.65
        } else if (mStatus==='small'||mStatus==='large') {
          mStatus='medium'
          gsap.to([mBG,mOut,mMP],1,{morphSVG:mMBG,ease:'expo.out'})
          gsap.to(tooth,1,{x:0,y:0,ease:'expo.out'})
          gsap.to(tongue,1,{x:0,y:1,ease:'expo.out'})
          gsap.to([eL,eR],1,{scaleX:.85,scaleY:.85,ease:'expo.out'})
          eyeS=.85
        }
      } else {
        mStatus='small'
        gsap.to([mBG,mOut,mMP],1,{morphSVG:mSBG,shapeIndex:9,ease:'expo.out'})
        gsap.to(tooth,1,{x:0,y:0,ease:'expo.out'})
        gsap.to(tongue,1,{y:0,ease:'expo.out'})
        gsap.to([eL,eR],1,{scaleX:1,scaleY:1,ease:'expo.out'})
        eyeS=1
      }
    }
    function onUserF(e) { activeEl='username'; onUserI() }
    function onUserB(e) {
      activeEl=null
      setTimeout(()=>{if (activeEl!=='username') { resetF() }},100)
    }
    function resetF() {
      gsap.to([eL,eR],1,{x:0,y:0,ease:'expo.out'})
      gsap.to(nose,1,{x:0,y:0,scaleX:1,scaleY:1,ease:'expo.out'})
      gsap.to(mouth,1,{x:0,y:0,rotation:0,ease:'expo.out'})
      gsap.to(chin,1,{x:0,y:0,scaleY:1,ease:'expo.out'})
      gsap.to([face,eb],1,{x:0,y:0,skewX:0,ease:'expo.out'})
      gsap.to([oeL,oeR,ehL,ehR,hair],1,{x:0,y:0,scaleY:1,ease:'expo.out'})
    }
    function startB(d) { d=d?gRand(d):1; blink=gsap.to([eL,eR],.1,{delay:d,scaleY:0,yoyo:true,repeat:1,transformOrigin:'center center',onComplete:()=>startB(12)}) }
    function onPwdF() { activeEl='password'; if (!eyesC) { gsap.killTweensOf([aL,aR]); gsap.set([aL,aR],{visibility:'visible'}); gsap.to(aL,.45,{x:-93,y:10,rotation:0,ease:'quad.out'}); gsap.to(aR,.45,{x:-93,y:10,rotation:0,ease:'quad.out',delay:.1}); gsap.to(bBG,.45,{morphSVG:bBGc,ease:'quad.out'}); eyesC=true } }
    function onPwdB() {
      activeEl=null
      setTimeout(()=>{if (activeEl!=='toggle'&&activeEl!=='password') { gsap.killTweensOf([aL,aR]); gsap.to(aL,1.35,{y:220,ease:'quad.out'}); gsap.to(aL,1.35,{rotation:105,ease:'quad.out',delay:.1}); gsap.to(aR,1.35,{y:220,ease:'quad.out'}); gsap.to(aR,1.35,{rotation:-105,ease:'quad.out',delay:.1,onComplete:()=>gsap.set([aL,aR],{visibility:'hidden'})}); gsap.to(bBG,.45,{morphSVG:bBG,ease:'quad.out'}); eyesC=false }},100)
    }
    function spreadFingers() { gsap.to(twoF,.35,{transformOrigin:'bottom left',rotation:30,x:-9,y:-2,ease:'power2.inOut'}) }
    function closeFingers() { gsap.to(twoF,.35,{transformOrigin:'bottom left',rotation:0,x:0,y:0,ease:'power2.inOut'}) }
    function coverEyes() {
      gsap.killTweensOf([aL,aR])
      gsap.set([aL,aR],{visibility:'visible'})
      gsap.to(aL,.45,{x:-93,y:10,rotation:0,ease:'quad.out'})
      gsap.to(aR,.45,{x:-93,y:10,rotation:0,ease:'quad.out',delay:.1})
      gsap.to(bBG,.45,{morphSVG:bBGc,ease:'quad.out'})
      eyesC=true
    }
    function uncoverEyes() {
      gsap.killTweensOf([aL,aR])
      gsap.to(aL,1.35,{y:220,ease:'quad.out'})
      gsap.to(aL,1.35,{rotation:105,ease:'quad.out',delay:.1})
      gsap.to(aR,1.35,{y:220,ease:'quad.out'})
      gsap.to(aR,1.35,{rotation:-105,ease:'quad.out',delay:.1,onComplete:()=>gsap.set([aL,aR],{visibility:'hidden'})})
      gsap.to(bBG,.45,{morphSVG:bBG,ease:'quad.out'})
      eyesC=false
    }

    gsapRef.current = { spreadFingers, closeFingers, coverEyes, uncoverEyes }

    function onToggleFocus() { activeEl = 'toggle'; if (!eyesC) coverEyes() }
    function onToggleBlur() {
      activeEl = null
      setTimeout(()=>{if (activeEl!=='password'&&activeEl!=='toggle') uncoverEyes()},100)
    }

    svgC = gPos(svg)
    inputC = gPos(username)
    sc = svgC.x + (svg.offsetWidth/2)
    eLC = {x:svgC.x+84,y:svgC.y+76}
    eRC = {x:svgC.x+113,y:svgC.y+76}
    nC = {x:svgC.x+97,y:svgC.y+81}
    mC = {x:svgC.x+100,y:svgC.y+100}
    username.addEventListener('focus',onUserF)
    username.addEventListener('blur',onUserB)
    username.addEventListener('input',onUserI)
    pwd.addEventListener('focus',onPwdF)
    pwd.addEventListener('blur',onPwdB)
    if (toggleBtn) {
      toggleBtn.addEventListener('focus',onToggleFocus)
      toggleBtn.addEventListener('blur',onToggleBlur)
    }
    gsap.set(aL,{x:-93,y:220,rotation:105,transformOrigin:'top left'})
    gsap.set(aR,{x:-93,y:220,rotation:-105,transformOrigin:'top right'})
    gsap.set(mouth,{transformOrigin:'center center'})
    startB(5)
    inputScrollWidth = username.scrollWidth

    return () => {
      blink?.kill(); gsap.killTweensOf('*')
      username.removeEventListener('focus',onUserF); username.removeEventListener('blur',onUserB); username.removeEventListener('input',onUserI)
      pwd.removeEventListener('focus',onPwdF); pwd.removeEventListener('blur',onPwdB)
      if (toggleBtn) {
        toggleBtn.removeEventListener('focus',onToggleFocus)
        toggleBtn.removeEventListener('blur',onToggleBlur)
      }
    }
  }, [])

  const handleToggle = () => {
    const next = !showPassword
    setShowPassword(next)
    if (next) gsapRef.current.spreadFingers?.()
    else gsapRef.current.closeFingers?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(username, password)
      if (data.role === 'guru') navigate('/guru/dashboard')
      else if (!data.user.approved) navigate('/waiting-approval')
      else navigate('/siswa/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form ref={formRef} className="login-form" onSubmit={handleSubmit}>
        <div className="svgContainer">
          <div>
            <svg className="mySVG" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
              <defs><circle id="armMaskPath" cx="100" cy="100" r="100"/></defs>
              <clipPath id="armMask"><use xlinkHref="#armMaskPath" overflow="visible"/></clipPath>
              <circle cx="100" cy="100" r="100" fill="#a9ddf3"/>
              <g className="body">
                <path className="bodyBGchanged" style={{display:'none'}} fill="#fff" d="M200,122h-35h-14.9V72c0-27.6-22.4-50-50-50s-50,22.4-50,50v50H35.8H0l0,91h200L200,122z"/>
                <path className="bodyBGnormal" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#fff" d="M200,158.5c0-20.2-14.8-36.5-35-36.5h-14.9V72.8c0-27.4-21.7-50.4-49.1-50.8c-28-0.5-50.9,22.1-50.9,50v50H35.8C16,122,0,138,0,157.8L0,213h200L200,158.5z"/>
                <path fill="#DDF1FA" d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9C143,167.5,122.9,156.4,100,156.4z"/>
              </g>
              <g className="earL"><g className="outerEar" fill="#ddf1fa" stroke="#3a5e77" strokeWidth="2.5"><circle cx="47" cy="83" r="11.5"/><path d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1" strokeLinecap="round" strokeLinejoin="round"/></g><g className="earHair"><rect x="51" y="64" fill="#fff" width="15" height="35"/><path d="M53.4 62.8C48.5 67.4 45 72.2 42.8 77c3.4-.1 6.8-.1 10.1.1-4 3.7-6.8 7.6-8.2 11.6 2.1 0 4.2 0 6.3.2-2.6 4.1-3.8 8.3-3.7 12.5 1.2-.7 3.4-1.4 5.2-1.9" fill="#fff" stroke="#3a5e77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g></g>
              <g className="earR"><g className="outerEar"><circle fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" cx="153" cy="83" r="11.5"/><path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M153.7,78.9c2.3,0,4.1,1.9,4.1,4.1c0,2.3-1.9,4.1-4.1,4.1"/></g><g className="earHair"><rect x="134" y="64" fill="#fff" width="15" height="35"/><path fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M146.6,62.8c4.9,4.6,8.4,9.4,10.6,14.2c-3.4-0.1-6.8-0.1-10.1,0.1c4,3.7,6.8,7.6,8.2,11.6c-2.1,0-4.2,0-6.3,0.2c2.6,4.1,3.8,8.3,3.7,12.5c-1.2-0.7-3.4-1.4-5.2-1.9"/></g></g>
              <path className="chin" d="M84.1 121.6c2.7 2.9 6.1 5.4 9.8 7.5l.9-4.5c2.9 2.5 6.3 4.8 10.2 6.5 0-1.9-.1-3.9-.2-5.8 3 1.2 6.2 2 9.7 2.5-.3-2.1-.7-4.1-1.2-6.1" fill="none" stroke="#3a5e77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path className="face" fill="#DDF1FA" d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46"/>
              <path className="hair" fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M81.457,27.929c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474"/>
              <g className="eyebrow"><path fill="#fff" d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037c-4.569-1.465-8.909-3.222-12.996-5.226c-0.98,3.075-2.07,6.137-3.267,9.179c-5.514-3.067-10.559-6.545-15.097-10.329c-1.806,2.889-3.745,5.73-5.816,8.515c-7.916-4.124-15.053-9.114-21.296-14.738l1.107-11.768h73.475V55.064z"/><path fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M63.56,55.102c6.243,5.624,13.38,10.614,21.296,14.738c2.071-2.785,4.01-5.626,5.816-8.515c4.537,3.785,9.583,7.263,15.097,10.329c1.197-3.043,2.287-6.104,3.267-9.179c4.087,2.004,8.427,3.761,12.996,5.226c0.545-3.348,0.986-6.696,1.322-10.037c4.913-0.481,9.857-1.34,14.787-2.599"/></g>
              <g className="eyeL"><circle cx="85.5" cy="78.5" r="3.5" fill="#3a5e77"/><circle cx="84" cy="76" r="1" fill="#fff"/></g>
              <g className="eyeR"><circle cx="114.5" cy="78.5" r="3.5" fill="#3a5e77"/><circle cx="113" cy="76" r="1" fill="#fff"/></g>
              <g className="mouth">
                <path className="mouthBG" fill="#617E92" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
                <path style={{display:'none'}} className="mouthSmallBG" fill="#617E92" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
                <path style={{display:'none'}} className="mouthMediumBG" d="M95,104.2c-4.5,0-8.2-3.7-8.2-8.2v-2c0-1.2,1-2.2,2.2-2.2h22c1.2,0,2.2,1,2.2,2.2v2c0,4.5-3.7,8.2-8.2,8.2H95z"/>
                <path style={{display:'none'}} className="mouthLargeBG" d="M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" fill="#617e92" stroke="#3A5E77" strokeLinejoin="round" strokeWidth="2.5"/>
                <defs><path id="mouthMaskPath" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/></defs>
                <clipPath id="mouthMask"><use xlinkHref="#mouthMaskPath" overflow="visible"/></clipPath>
                <g clipPath="url(#mouthMask)"><g className="tongue"><circle cx="100" cy="107" r="8" fill="#cc4a6c"/><ellipse className="tongueHighlight" cx="100" cy="100.5" rx="3" ry="1.5" opacity=".1" fill="#fff"/></g></g>
                <path clipPath="url(#mouthMask)" className="tooth" style={{fill:'#fff'}} d="M106,97h-4c-1.1,0-2-0.9-2-2v-2h8v2C108,96.1,107.1,97,106,97z"/>
                <path className="mouthOutline" fill="none" stroke="#3A5E77" strokeWidth="2.5" strokeLinejoin="round" d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"/>
              </g>
              <path className="nose" d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z" fill="#3a5e77"/>
              <g className="arms" clipPath="url(#armMask)">
                <g className="armL" style={{visibility:'hidden'}}>
                  <polygon fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="121.3,98.4 111,59.7 149.8,49.3 169.8,85.4"/>
                  <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M134.4,53.5l19.3-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-10.3,2.8"/>
                  <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M150.9,59.4l26-7c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-21.3,5.7"/>
                  <g className="twoFingers">
                    <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M158.3,67.8l23.1-6.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-23.1,6.2"/>
                    <path fill="#A9DDF3" d="M180.1,65l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L180.1,65z"/>
                    <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M160.8,77.5l19.4-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-18.3,4.9"/>
                    <path fill="#A9DDF3" d="M178.8,75.7l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L178.8,75.7z"/>
                  </g>
                  <path fill="#A9DDF3" d="M175.5,55.9l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L175.5,55.9z"/>
                  <path fill="#A9DDF3" d="M152.1,50.4l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L152.1,50.4z"/>
                  <path fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M123.5,97.8c-41.4,14.9-84.1,30.7-108.2,35.5L1.2,81c33.5-9.9,71.9-16.5,111.9-21.8"/>
                  <path fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M108.5,60.4c7.7-5.3,14.3-8.4,22.8-13.2c-2.4,5.3-4.7,10.3-6.7,15.1c4.3,0.3,8.4,0.7,12.3,1.3c-4.2,5-8.1,9.6-11.5,13.9c3.1,1.1,6,2.4,8.7,3.8c-1.4,2.9-2.7,5.8-3.9,8.5c2.5,3.5,4.6,7.2,6.3,11c-4.9-0.8-9-0.7-16.2-2.7"/>
                  <path fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M94.5,103.8c-0.6,4-3.8,8.9-9.4,14.7c-2.6-1.8-5-3.7-7.2-5.7c-2.5,4.1-6.6,8.8-12.2,14c-1.9-2.2-3.4-4.5-4.5-6.9c-4.4,3.3-9.5,6.9-15.4,10.8c-0.2-3.4,0.1-7.1,1.1-10.9"/>
                  <path fill="#fff" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M97.5,63.9c-1.7-2.4-5.9-4.1-12.4-5.2c-0.9,2.2-1.8,4.3-2.5,6.5c-3.8-1.8-9.4-3.1-17-3.8c0.5,2.3,1.2,4.5,1.9,6.8c-5-0.6-11.2-0.9-18.4-1c2,2.9,0.9,3.5,3.9,6.2"/>
                </g>
                <g className="armR" style={{visibility:'hidden'}}>
                  <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M265.4 97.3l10.4-38.6-38.9-10.5-20 36.1z"/>
                  <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M252.4 52.4L233 47.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l10.3 2.8M226 76.4l-19.4-5.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l18.3 4.9M228.4 66.7l-23.1-6.2c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l23.1 6.2M235.8 58.3l-26-7c-2.7-.7-5.4.9-6.1 3.5-.7 2.7.9 5.4 3.5 6.1l21.3 5.7"/>
                  <path fill="#a9ddf3" d="M207.9 74.7l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM206.7 64l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM211.2 54.8l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8zM234.6 49.4l-2.2-.6c-1.1-.3-2.2.3-2.4 1.4-.3 1.1.3 2.2 1.4 2.4l2.2.6 1-3.8z"/>
                  <path fill="#fff" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M263.3 96.7c41.4 14.9 84.1 30.7 108.2 35.5l14-52.3C352 70 313.6 63.5 273.6 58.1"/>
                  <path fill="#fff" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M278.2 59.3l-18.6-10 2.5 11.9-10.7 6.5 9.9 8.7-13.9 6.4 9.1 5.9-13.2 9.2 23.1-.9M284.5 100.1c-.4 4 1.8 8.9 6.7 14.8 3.5-1.8 6.7-3.6 9.7-5.5 1.8 4.2 5.1 8.9 10.1 14.1 2.7-2.1 5.1-4.4 7.1-6.8 4.1 3.4 9 7 14.7 11 1.2-3.4 1.8-7 1.7-10.9M314 66.7s5.4-5.7 12.6-7.4c1.7 2.9 3.3 5.7 4.9 8.6 3.8-2.5 9.8-4.4 18.2-5.7.1 3.1.1 6.1 0 9.2 5.5-1 12.5-1.6 20.8-1.9-1.4 3.9-2.5 8.4-2.5 8.4"/>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="inputGroup inputGroup1">
          <label htmlFor="loginUsername">Nama Panggilan / Nama Lengkap</label>
          <input type="text" id="loginUsername" maxLength="50" placeholder="Nama panggilan atau lengkap"
            value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="inputGroup inputGroup2">
          <label htmlFor="loginPassword">Password</label>
          <div className="pwd-wrapper">
            <input type={showPassword ? 'text' : 'password'} id="loginPassword" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" id="showPasswordToggle" tabIndex={-1} onClick={handleToggle}>
              {showPassword ? <EyeOpen /> : <EyeClosed />}
            </button>
          </div>
        </div>

        <div className="inputGroup inputGroup3">
          <button id="login" type="submit" disabled={loading}>
            {loading ? 'Memuat...' : 'Log in'}
          </button>
        </div>

        <p className="login-footer">
          Belum punya akun? <a href="/signup" onClick={e => { e.preventDefault(); navigate('/signup') }}>Daftar di sini</a>
        </p>
      </form>
    </div>
  )
}
