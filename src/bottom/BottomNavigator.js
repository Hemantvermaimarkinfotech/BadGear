import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../AppStack/Home';
const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
export default BottomNavigator