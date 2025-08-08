import { Animated, Button, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, useAnimatedValue, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { compareAsc, format } from "date-fns";
import './locales/i18n';
import { useTranslation } from 'react-i18next';
//  import { format } from 'date-fns';


const DashboardScreen = () => {
    const slideTop = useAnimatedValue(-300);
    const SlideTop = () => {
        // Will change slideTop value to 1 in 5 seconds
        Animated.timing(slideTop, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const slideBottom = useAnimatedValue(300);
    const SlideBottom = () => {
        // Will change slideTop value to 1 in 5 seconds
        Animated.timing(slideBottom, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const slideLeft = useAnimatedValue(-300);
    const SlideLeft = () => {
        // Will change slideTop value to 1 in 5 seconds
        Animated.timing(slideLeft, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const slideRight = useAnimatedValue(300);
    const SlideRight = () => {
        // Will change slideTop value to 1 in 5 seconds
        Animated.timing(slideRight, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        SlideTop()
        SlideBottom()
        SlideRight()
        SlideLeft()
    }, [])
    const [isDark, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // const [theme, setTheme] = useState('light');

    // const isDark = isEnabled === 'dark';

    const themeStyles = {
        backgroundColor: isDark ? '#111' : '#fff',
        color: isDark ? '#fff' : '#000',
    };
    const { t, i18n } = useTranslation();
 const switchLanguage = () => {
 const newLang = i18n.language === 'en' ? 'ur' : 'en';
 i18n.changeLanguage(newLang);
 };
    return (
        // <SafeAreaView>
        <SafeAreaProvider>
            <SafeAreaView style={[style.container, {backgroundColor: themeStyles.backgroundColor}]}>
                <Animated.View style={{ flexDirection: 'row', width: '95%', marginVertical: 30, justifyContent: 'space-between' }}>
                    <Text style={{ textAlign: 'left' }}>Overview</Text>

                    <View>

                    <Switch
                        trackColor={{ false: '#767577', true: '#B10808' }}
                        thumbColor={isDark ? '#42423fff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isDark}
                    />
                    </View>
                    {/* <Text style={{ textAlign: 'left' }}>Overview</Text> */}
                </Animated.View>
                <Animated.View style={[style.fadingContainer, { translateY: slideTop, height: 100, justifyContent: 'center' }]}>
                    <Text style={style.heading}>{t('welcome')} Wishal Hyder</Text>
                    <Text style={style.title}>{format(new Date(), "yyyy-MM-dd")}</Text>
                    <Button title={t('change_lang')} onPress={()=>{switchLanguage()}} />
                    {/* <Text style={style.heading}>{format(new Date(), 'PPP')}</Text> */}
                    
                </Animated.View>
                <View style={{ width: '95%', marginTop: 20 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Animated.View style={[style.Card, { translateX: slideLeft }]}>
                            <Text style={style.title}>Inflows</Text>
                            <Text style={style.subText}>PKR 100,000</Text>
                        </Animated.View>
                        <Animated.View style={[style.Card, { translateX: slideRight }]}>
                            <Text style={style.title}>Outflows</Text>
                            <Text style={style.subText}>PKR 60,000</Text>
                        </Animated.View>
                    </View>
                    <Animated.View style={[style.Card, { translateX: slideLeft, width: '95%' }]}>
                        <Text style={style.title}>Inflows</Text>
                        <Text style={style.subText}>PKR 100,000</Text>
                    </Animated.View>
                    <Animated.View style={[style.Card, { translateX: slideRight, width: '95%' }]}>
                        <Text style={style.title}>Inflows</Text>
                        <Text style={style.subText}>PKR 100,000</Text>
                    </Animated.View>
                    <Animated.View style={[style.Card, { translateX: slideLeft, width: '95%' }]}>
                        <Text style={style.title}>Inflows</Text>
                        <Text style={style.subText}>PKR 100,000</Text>
                    </Animated.View>
                </View>
                <Animated.View style={[{ translateY: slideBottom, flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', width: '89%' }]}>
                    <Text style={style.title}>FAQs</Text>
                    <Text style={style.title}>Call us</Text>
                    <Text style={style.title}>Complaints</Text>
                </Animated.View>
            </SafeAreaView>
        </SafeAreaProvider>

        // </SafeAreaView> 
    )
}

export default DashboardScreen

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
        // justifyContent: 'center',
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#B10808',
        textAlign: 'center'
    },
    subHeaing: {
        fontSize: 20,
        fontWeight: '700',
        color: '#B10808',
        textAlign: 'center'
    },
    loginBtn: {
        width: '90%',
        height: 45,
        marginTop: 20,
        backgroundColor: '#B10808',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    signText: {
        fontWeight: '400',
        fontSize: 13,
        color: '#B10808'
    },
    Card: {
        // flex: 1,
        backgroundColor: '#f9e6e6',
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '45%',
        marginHorizontal: 10,
        elevation: 6,
        marginBottom: 20,
        
        // padding: 20
    },
    title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#B10808',
textAlign: 'center'
        // textAlign: 'center'
    },
    subText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#B10808',
        textAlign: 'center'
        // textAlign: 'center'
    },
    fadingContainer: {
        // padding: 20,
        // backgroundColor: '#000',
    },
}); 