import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MenuScreen from "../screens/MenuScreen";
import CreateScreen from "../screens/CreateAttendanceScreen";
import ViewScreen from "../screens/ViewAttendanceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StudentsScreen from "../screens/StudentsScreen";
import ScannerScreen from "../screens/ScannerScreen";
import AddStudentScreen from "../screens/AddStudentScreen.js";
import ListScreen from "../screens/ListScreen";

const AppNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Start: StartScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
  }),
  menuFlow: createStackNavigator({
    Menu: MenuScreen,
    Create: CreateScreen,
    Attendance: ViewScreen,
    Profile: ProfileScreen,
    Students: StudentsScreen,
    Scanner: ScannerScreen,
    AddStudent: AddStudentScreen,
    List: ListScreen,
  }),
});

export default createAppContainer(AppNavigator);
