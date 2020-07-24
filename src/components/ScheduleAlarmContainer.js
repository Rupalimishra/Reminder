import React, {useState} from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import Logger from '../Utils/Logger';


const ScheduleAlarmContainer = () => {
    const [task, setTask] = useState('');
    const [day, setDay] = useState('Today');
    const [showWarning, setWarning] = useState(false);

    const taskFieldRef = React.createRef();
    const timeFieldRef = React.createRef();

    const refs = {
        taskFieldRef,
        timeFieldRef
    };

    const handleSetAlarmbutton = () => {
        console.log('inputValue, selectValue', inputValue, selectValue);
        if (day === 'Today' ) {
            if (!task || !time) {
                const state = {
                    'taskFieldRef': task,
                    'timeFieldRef': time
                };
    
                Object.keys(state).map(key => {
                    if (!state[key]) {
                        let existingClasses = refs[key].current.className;
                        const classArray = existingClasses.split(' ');
                        if (classArray.indexOf('warning-vibration-animation') >= 0) {
                            classArray[classArray.indexOf('warning-vibration-animation')] = 'warning-vibration-animation-toggle';
                            Logger('classArray', classArray);
                            refs[key].current.className = `${classArray.join(' ')}`;
                        } else if (classArray.indexOf('warning-vibration-animation-toggle') >= 0) {
                            classArray[classArray.indexOf('warning-vibration-animation-toggle')] = 'warning-vibration-animation';
                            Logger('classArray', classArray);
                            refs[key].current.className = `${classArray.join(' ')}`;
                        } else {
                            refs[key].current.className = `${classArray.join(' ')} warning-vibration-animation`;
                        }
                    }
                })
                setTimeout(() => {
                    taskFieldRef.current.className = 'taskInputField';
                    timeFieldRef.current.className = 'inputTime';
                    console.log("Removed");
                }, 1000);
                return;
            } else if(day === 'Today') {
                let stringNewDate = String(new Date()); 


                stringNewDate = stringNewDate.slice(0, stringNewDate.indexOf(new Date().getFullYear()) + 5) + time + ':00' + ' ' + stringNewDate.slice(stringNewDate.indexOf('GMT'));
                console.log('stringNewDate', stringNewDate);
                if(new Date(stringNewDate).getTime() < new Date().getTime()) {
                    console.log("Dfdsfdsfdsfdsf");
                    return;
                }
            }

            if (!inputValue) {
                timeFieldRef.current.className = 'inputSelect warning-vibration-animation';
                setTimeout(() => {
                    timeFieldRef.current.className = 'inputSelect';
                    console.log("Removed");
                }, 1000);
                return;
            }

            if (inputValue < 5 && selectValue === 's') {
                setWarning(true);

                setTimeout(() => {
                    setWarning(false);
                }, 2000);

                return;
            }

        }

        switch (day) {

            case 'Today':

                let stringNewDate = String(new Date());

                stringNewDate = stringNewDate.slice(0, stringNewDate.indexOf(new Date().getFullYear()) + 5) + time + ':00' + ' ' + stringNewDate.slice(stringNewDate.indexOf('GMT'));

                console.log('newDate', stringNewDate);

                chrome.alarms.create(task, {
                    when: new Date(stringNewDate).getTime()
                })
                break;

                
        }
        function showSnackBar() {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
        }

        showSnackBar();
    }

    return (
        <div className="scheduleAlarmContainer">
            <Input 
                type="text"
                placeholder="Task"
                name="task"
                value={task}
                onChange={setTask}
                ref={taskFieldRef}
                className="taskInputField"
            />
            <Select 
                name="day"
                options={["Today"]}
                value={day}
                onChange={setDay}
                className="daySelect"
            />
           
            {
                showWarning 
                    ?  
                        <div className="warningMessage">Time should be greater than 5 Seconds</div>
                    : 
                        <div className="warningMessage"></div>
            }
            <Button 
                name="setAlarmButton"
                value="Set Alarm"
                className="setAlarmButton"
                onClick={handleSetAlarmbutton}
            />
        </div>
    )
}

export default ScheduleAlarmContainer;