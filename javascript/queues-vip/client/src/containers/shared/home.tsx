import React from 'react';
import SerivcesSettingsStyle from '../domain/service/services.module.scss';


const Home: React.FC = () => {

    return (
        <React.Fragment>

            <div className={SerivcesSettingsStyle.Service}>
                <div className={SerivcesSettingsStyle.SerivcesSettings}>
                    <div className={SerivcesSettingsStyle.Services} >
                        <p style={{ margin: '15px 15px', padding: '15px 15px' }}>
                            English version is comming soon :)
                        <br></br>
                            <br></br>

                            ברוך הבא לתור vip.
                        <br></br>
                         באפשרותך להתחבר בתור מנהל
                     לעסק demo
                        <br></br>
                    phone :   0541234567
                            <br></br>
                            password:   0541234567

                            <br></br>
                            או להרשם בקלות (אין צורך באימות)
                        <br></br>
                        אם בחרת להירשם תצטרך להגדיר שעות פתיחה ולפחות שירות אחד
                        <br></br>
                         בשביל שהאתר של הלקוח יפעל.
                            <br></br>
                            <br></br>
                       הכתובת של העסק ללקוח זה
                            <br></br>
                        queues.vip/domain
                        <br></br>
                        domain = הכתובת שבחרתם בשלב ה1 של ההרשמה
                        <br></br>
                            <br></br>
                          או להיכנס בתור לקוח לעסק demo
                            <br></br>
                            <a href="http://queues.vip/demo">queues.vip/demo</a>
                            <br></br>
                            <br></br>
                            phone :   0541234567
                            <br></br>

                            או להרשם בתור לקוח חדש
                            <br></br>


                            <br></br>
לאחר מכן תוכלו לבחור שירות
<br></br>

ולראות רק מתי יש מקום פנוי ולקבוע תור בקלות.
                        </p>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default (Home);

