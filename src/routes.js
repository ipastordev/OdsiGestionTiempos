import { StackNavigator } from 'react-navigation';

import Home from './App/Home.react';
// components
//import ActionButton from './ActionButton';
//import ActionButtonToolbar from './ActionButton/ActionButtonToolbar.react';
//import ActionButtonSpeedDial from './ActionButton/ActionButtonSpeedDial.react';
// import Avatar from './Avatar';
// import BotstomNavigation from './BottomNavigation';
// import Badge from './Badge';
// import Button from './Button';
// import Card from './Card';
// import Checkbox from './Checkbox';
// import Dialog from './Dialog';
import Drawer from './Drawer';
// import IconToggle from './IconToggle';
// import List from './List';
// import RadioButton from './RadioButton';
// import Toolbar from './Toolbars';
import Prueba from './prueba';

import LoginForm from './login/LoginForm';
import Asignaturas from './Asignaturas/Asignaturas';
import RegisterForm from './Register/RegisterForm';												

const AppNavigator = StackNavigator({
    home: { screen: Home },
    loginForm:{screen:LoginForm},
    prueba:{screen:Prueba},
    asignaturas:{screen:Asignaturas},
    register:{screen:RegisterForm},
    /*actionButton: { screen: ActionButton },
    actionButtonToolbar: { screen: ActionButtonToolbar },
    actionButtonSpeedDial: { screen: ActionButtonSpeedDial },
    avatar: { screen: Avatar },
    badge: { screen: Badge },
    bottomNavigation: { screen: BottomNavigation },
    button: { screen: Button },
    card: { screen: Card },
    checkbox: { screen: Checkbox },
    dialog: { screen: Dialog },*/
    drawer: { screen: Drawer },
  /*  iconToggle: { screen: IconToggle },
    list: { screen: List },
    radioButton: { screen: RadioButton },
    toolbar: { screen: Toolbar },*/
}, {
    headerMode: 'none',
});

export default AppNavigator;
