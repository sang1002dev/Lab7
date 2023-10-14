import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, TextInput, FlatList, Modal } from 'react-native';
import axios from 'axios';

const MockAPIURL = 'https://6526a0fd917d673fd76cabc2.mockapi.io/User';

const UserManagementApp = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', pass: '' });
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [editedUser, setEditedUser] = useState({ name: '', pass: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(MockAPIURL);
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post(MockAPIURL, newUser);
      fetchUsers();
      setNewUser({ name: '', pass: '' });
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setEditModalVisible(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${MockAPIURL}/${selectedUser.id}`, editedUser);
      setEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${MockAPIURL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  return (
    <View>
      <TextInput
      style={{marginTop: 60}}
        placeholder="Tên"
        value={newUser.name}
        onChangeText={(text) => setNewUser({ ...newUser, name: text })}
      />
      <TextInput
        placeholder="Pass"
        value={newUser.pass}
        onChangeText={(text) => setNewUser({ ...newUser, pass: text })}
      />
      <Button title="Thêm" onPress={handleAddUser} />

      <FlatList
  data={users}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.passText}>{item.pass}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sửa" onPress={() => handleEditUser(item)} />
        <Button title="Xóa" onPress={() => handleDeleteUser(item.id)} />
      </View>
    </View>
  )}
/>



      <Modal visible={isEditModalVisible}>
        <View>
          <TextInput
            placeholder="Tên"
            value={editedUser.name}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
          />
          <TextInput
            placeholder="Pass"
            value={editedUser.pass}
            onChangeText={(text) => setEditedUser({ ...editedUser, pass: text })}
          />
          <Button title="Cập nhật" onPress={handleUpdateUser} />
          <Button title="Hủy" onPress={() => setEditModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
  
};
// Styles
const styles = {
  itemContainer: {
    flexDirection: 'column', // Sử dụng column để đặt tên phía trên và mật khẩu phía dưới
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',  
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  passText: {
    fontSize: 16,
   
  },
  buttonContainer: {
    
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};




export default UserManagementApp;
