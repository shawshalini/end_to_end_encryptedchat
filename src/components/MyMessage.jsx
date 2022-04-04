
import { Base64 } from "js-base64";
import { useState } from "react";

const MyMessage = ({ message }) => {
  const [showEncode, setShowEncode] = useState(false);
  const [showImg, setshowImg] = useState(true);

  if (message.attachments && message.attachments.length > 0) {
    return (
      <>
        {
          (showImg) ?
        
            <img
              onMouseEnter={() => setshowImg(false)} 
              src={message.attachments[0].file}
              alt="message-attachment"
              className="message-image"
              style={{ float: 'right' }}
            />
            : 
           <div  style={{ float: 'right', color: 'white', backgroundColor: '#3B2A50', width: '50%' }} onMouseOut={()=> setshowImg(true)}>
            <h3 style={{textAlign:'center', marginBottom:'5px', }}>Encrypted Image File</h3>
            <textarea rows={3} style={{ width: '100%', border: 'none' }} className="encrypted">
               {Base64.encode(message.attachments[0].file)}
            </textarea>
          </div>
        }
        
        </>
    );
  } 
  var CryptoJS = require("crypto-js");

  return (
    <>
      {console.log("my message", message)}
      {(message.sender.avatar === null) ?
        <span style={{ float: 'right' }}>
          <div class="avatar-icon-wrapper avatar-initials avatar-icon-xl mr-4">
            <div class="avatar-icon text-white">
              {`${message?.sender?.username}`.match(/\b([A-Za-z])/g)?.join('')}
            </div>
          </div>
        </span>
        :
        <div
          className="message-avatar"
          style={{ backgroundImage: message.sender && `url(${message.sender.avatar})`, float: 'right' }}
        />
      }
      <div className="message" style={{ float: 'right', height: 'auto', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50', width: showEncode && '50%' }} onMouseEnter={() => setShowEncode(true)} onMouseLeave={() => setShowEncode(false)}   >
        {showEncode ?
          <>
            <h3 style={{textAlign:'center', marginBottom:'5px'}}>Encrypted Text</h3>
            <textarea rows={3} style={{ width: '100%', border: 'none' }} className="encrypted">
              {CryptoJS.AES.encrypt(`${message.text}`, 'secret key 123').toString()}
            </textarea>
          </>
          :
          message.text
        }
      </div>
    </>
  );
};

export default MyMessage;

