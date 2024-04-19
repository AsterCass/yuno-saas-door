// https://quasar.dev/options/installing-icon-libraries
import 'quasar/dist/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import "@/styles/base-style.scss"

import {Loading, Notify} from 'quasar'

export default {
    plugins: {Loading, Notify},
    config: {loading: {}, notify: {}},
}