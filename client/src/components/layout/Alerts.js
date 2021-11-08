import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  
  return (
    // look at alerts in the alertContext, if there is anything, it will...
    alertContext.alerts.length > 0 && 

    // loop through them and output this div
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  )
}

export default Alerts
