import React from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import TicketScreen from "../screens/TicketScreen";
import UserScreen from "../screens/UserScreen";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme'
import { View, StyleSheet } from "react-native";
import Customicon from "../components/Customicon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return <Tab.Navigator 
            screenOptions={{
                tabBarHideOnKeyboard : true,
                headerShown : false,
                tabBarStyle: {
                    backgroundColor: COLORS.Black,
                    borderTopWidth: 0,
                    height: SPACING.space_8 * 10,
                }
            }}>
        <Tab.Screen 
            name = 'Home' 
            component={HomeScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return (
                        <View style = {[
                            styles.activeTab,
                            focused ? {backgroundColor: COLORS.Orange}
                            : {},
                        ]}>
                            <Customicon
                                name = 'video'
                                color= {COLORS.White}
                                size = {FONTSIZE.size_30}
                            />
                        </View>
                    )
                }
            }}
        />
        <Tab.Screen 
            name = 'Search' 
            component={SearchScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return <View style = {[
                            styles.activeTab,
                            focused ? {backgroundColor: COLORS.Orange}
                            : {},
                        ]}>
                        <Customicon
                            name = 'search'
                            color= {COLORS.White}
                            size = {FONTSIZE.size_30}
                        />
                    </View>
                }
            }}
        />
        <Tab.Screen    
            name = 'Ticket' 
            component={TicketScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return <View style = {[
                            styles.activeTab,
                            focused ? {backgroundColor: COLORS.Orange}
                            : {},
                        ]}>
                        <Customicon
                            name = 'ticket'
                            color= {COLORS.White}
                            size = {FONTSIZE.size_30}
                        />
                    </View>
                }
            }}
        />
        <Tab.Screen 
            name = 'Setting' 
            component={UserScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return <View style = {[
                            styles.activeTab,
                            focused ? {backgroundColor: COLORS.Orange}
                            : {},
                        ]}>
                        <Customicon
                            name = 'user'
                            color= {COLORS.White}
                            size = {FONTSIZE.size_30}
                        />
                    </View>
                }
            }}
        />
    </Tab.Navigator>
};

export default TabNavigator;

const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: COLORS.Black,
        padding: SPACING.space_12,
        borderRadius: SPACING.space_12 * 10,
    },
});