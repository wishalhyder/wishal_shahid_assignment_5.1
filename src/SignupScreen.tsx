import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { Dropdown } from 'react-native-element-dropdown';

const Month = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' }
]

const Days = [...Array(31).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }));
const Years = [...Array(31).keys()].map(i => ({ label: (i + 1990).toString(), value: (i + 1990).toString() }));
export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleSignup = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    // <View style={styles.container}>
    //   <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
    //   <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
    //   {error ? <Text style={styles.error}>{error}</Text> : null}
    //   <Button title="Signup" onPress={handleSignup} />
    //   <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    // </View>
    <ScrollView>
      <View style={style.container}>
        <View style={style.subContainer}>
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
          <TextInput style={style.emailText}
            placeholder="Name"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor={'#B10808'}
          />
          <TextInput style={style.emailText}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={'#B10808'}
          />
          <View>
            <Text style={style.subHeaing}>Birth Date</Text>
            <View style={style.birthdayContainer}>
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: 'blue' }, { width: '28%' }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={Month}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Month' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: 'blue' }, { width: '28%' }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={Days}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Day' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />

              <Dropdown
                style={[style.dropdown, isFocus && { borderColor: 'blue' }, { width: '28%' }]}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={Years}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Year' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              {/* <Dropdown
                style={[style.emailText, { width: '28%' }]}
                placeholder="Month"
                data={Month}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'#B10808'}
              /> */}
              {/* <Dropdown
                style={[style.emailText, { width: '28%' }]}
                placeholder="Day"
                data={[...Array(31).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'#B10808'}
              /> */}
              {/* <Dropdown
                style={[style.emailText, { width: '28%' }]}
                placeholder="Year"
                data={[...Array(31).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'#B10808'}
              /> */}
              {/* <TextInput style={[style.emailText, { width: '28%' }]}
                placeholder="May"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor={'#B10808'}
              /> */}
              {/* <TextInput style={[style.emailText, { width: '28%' }]}
                placeholder="12"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor={'#B10808'}
              />
              <TextInput style={[style.emailText, { width: '28%' }]}
                placeholder="1997"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                placeholderTextColor={'#B10808'}
              /> */}
            </View>

          </View>
          <View>
            <Text style={style.subHeaing}>Gender</Text>
            <View style={style.birthdayContainer}>
              {/* <TextInput style={[style.emailText, { width: '45%', height: 110 }]}
              placeholder="Name"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput style={[style.emailText, { width: '45%', height: 110 }]}
              placeholder="Name"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            /> */}
              <View style={[style.emailText, { width: '45%', height: 110, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontWeight: '700', fontSize: 16, color: '#B10808' }}>Male</Text>
                <Text>Other</Text>
              </View>
              <View style={[style.emailText, { width: '45%', height: 110, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontWeight: '700', fontSize: 16, color: '#B10808' }}>Female</Text>
              </View>
            </View>

          </View>
          <TextInput
            placeholder="Enter Password"
            value={password}
            style={style.passwordText}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={'#B10808'}
          />
          <TextInput
            placeholder="Confirm Password"
            value={password}
            style={style.passwordText}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={'#B10808'}
          />
          <TouchableOpacity onPress={handleSignup} style={style.loginBtn}>
            <Text style={style.btnText}>Create Profile</Text>
          </TouchableOpacity>
          {/* 
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
          <Text style={style.signText}>Create Profile</Text>
        </TouchableOpacity> */}

        </View>


      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 16 },
//   input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4 },
//   error: { color: 'red', marginBottom: 8 },
// });

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  subContainer: {
    backgroundColor: '#F9E6E6',
    width: 100,
    height: 100,
    elevation: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#B10808',
    textAlign: 'center'
  },
  subHeaing: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B10808',
    textAlign: 'left',
  },
  emailText: {
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
    color: '#B10808',
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10
  },
  passwordText: {
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
    color: '#B10808',
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10
  },
  birthdayContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 1
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
  btnText: {
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 14
  },
  signText: {
    fontWeight: '400',
    fontSize: 13,
    color: '#B10808'
  },
  imgContainer: {
    marginVertical: 20,
    width: 150,
    height: 150,
    backgroundColor: '#F9E6E6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown: {
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    elevation: 5,
    borderRadius: 5,
    padding: 5,
    color: '#B10808',
    fontWeight: '400',
    fontSize: 14,
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
}); 