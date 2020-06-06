import React, { useEffect } from 'react';
import shave from 'shave';
import "./PartnerProfile.css";
import { useSelector } from 'react-redux';
export default function PartnerProfile(props) {
  const partnerProfile = useSelector(state => state.messengerReducer.listConversation)
  return (
    <div className="partner-profile section-messenger">
      <div className="card ">
        <div className="card-header">
          <h5 className="card-title mb-0 text-center">Partner Profile</h5>
        </div>
        {
          props.currentConversation === false ? <div className="card-body text-center" style={{ minHeight: "100%" }}>None Profile</div> :
            <div style={{minHeight:"80vh"}}>
              <div className="card-body text-center">
                <img src={props.currentConversation.avatar} alt="Marie Salter" className="img-fluid rounded-circle mb-2" width={128} height={128} />
                <h4 className="card-title mb-0">{props.currentConversation.firstName +" " +  props.currentConversation.lastName}</h4>
                <div className="text-muted mb-2">Lead Developer</div>
                <div>
                  <a className="btn btn-primary btn-sm" href="#">Follow</a>
                  <a className="btn btn-primary btn-sm" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg> Message</a>
                </div>
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <h5 className="h6 card-title">Hobies</h5>
                <a href="#" className="badge badge-primary mr-1 my-1">{props.currentConversation.hobies}</a>

              </div>
              <div className="card-body">
                <h5 className="h6 card-title">Bio</h5>
                <a href="#" className="badge badge-primary mr-1 my-1">{props.currentConversation.bio}</a>
 
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <h5 className="h6 card-title">About</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-home feather-sm mr-1">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg> Lives in <a href="#">{props.currentConversation.live_address}</a></li>
                  <li className="mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase feather-sm mr-1">
                      <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg> Works at <a href="#">GitHub</a></li>
                  <li className="mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin feather-sm mr-1">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx={12} cy={10} r={3} />
                    </svg> From <a href="#">{props.currentConversation.from_address}</a></li>
                </ul>
              </div>
              <hr className="my-0" />
              <div className="card-body">
                <h5 className="h6 card-title">Elsewhere</h5>
                <ul className="list-unstyled mb-0">

                  <li className="mb-1">
                    <svg className="svg-inline--fa fa-instagram fa-w-14 fa-fw mr-1" aria-hidden="true" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg>
                      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                    {/* <span className="fab fa-instagram fa-fw mr-1"></span> */}<a href="#">Instagram</a></li>

                </ul>
              </div>
            </div>
        }
      </div>
    </div>
  );
}