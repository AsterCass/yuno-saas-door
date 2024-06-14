import {Notify} from "quasar";


function notifyTopRightWarning(msg, time) {
    Notify.create({
        message: msg,
        position: 'top-right',
        type: 'warning',
        timeout: time
    })
}

function notifyTopWarning(msg, time) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'warning',
        timeout: time
    })
}

function notifyTopNegative(msg, time) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'negative',
        timeout: time
    })
}

function notifyTopPositive(msg, time) {
    Notify.create({
        message: msg,
        position: 'top',
        type: 'positive',
        timeout: time
    })
}


export {
    notifyTopRightWarning, notifyTopWarning, notifyTopNegative, notifyTopPositive
}