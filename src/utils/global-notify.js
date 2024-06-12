import {Notify} from "quasar";

const notify = Notify.create

function notifyTopRightWarning(msg, time) {
    notify({
        message: msg,
        position: 'top-right',
        type: 'warning',
        timeout: time
    })
}

function notifyTopWarning(msg, time) {
    notify({
        message: msg,
        position: 'top',
        type: 'warning',
        timeout: time
    })
}

function notifyTopNegative(msg, time) {
    notify({
        message: msg,
        position: 'top',
        type: 'negative',
        timeout: time
    })
}

function notifyTopPositive(msg, time) {
    notify({
        message: msg,
        position: 'top',
        type: 'positive',
        timeout: time
    })
}


export {
    notifyTopRightWarning, notifyTopWarning, notifyTopNegative, notifyTopPositive
}