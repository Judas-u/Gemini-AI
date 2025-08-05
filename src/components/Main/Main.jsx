import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

 const Main = () => {

 const {onSent, recentPrompt,showResult, loading, resultData, input, setInput} = useContext(Context);

  return (

    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon}  />
        </div>

        <div className="main-container">

            {!showResult   
            ?<>

            <div className="greet">
                <p><span>Hello, Dev</span></p>
                <p>How Can I Help You Today?</p>
            </div>

            <div className="cards">
                <div className="card">
                    <p>Suggest Some Place To Visit In India.</p>
                    <img src={assets.compass_icon}  />
                </div>

                <div className="card">
                    <p>Explain the process of photosynthesis in simple terms</p>
                    <img src={assets.message_icon}  />
                </div>

                <div className="card">
                    <p>How do you create a responsive navbar using CSS and JavaScript?</p>
                    <img src={assets.bulb_icon}  />
                </div>

                <div className="card">
                    <p>What are some essential skills for becoming a front-end developer?</p>
                    <img src={assets.code_icon}  />
                </div>
            </div>
            </>
            : <div className='result'>
                
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter The Prompt Here' />
                    <div>
                        <img src={assets.gallery_icon}  />
                        <img src={assets.mic_icon}  />
                        <img onClick={()=> onSent()} src={assets.send_icon}  />
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main;
