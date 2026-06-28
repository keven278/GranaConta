import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Trash2 } from "lucide-react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function ConfirmDeleteModal({
  visible,
  onClose,
  onDelete,
}: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>

        <View style={styles.card}>

          <View style={styles.iconCircle}>
            <Trash2 color="#ef4444" size={42}/>
          </View>

          <Text style={styles.title}>
            Excluir transação?
          </Text>

          <Text style={styles.subtitle}>
            Tem certeza que deseja excluir essa
            transação?
            {"\n\n"}
            Essa ação não poderá ser desfeita.
          </Text>

          <View style={styles.buttons}>

            <TouchableOpacity
              style={styles.cancel}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delete}
              onPress={onDelete}
            >
              <Text style={styles.deleteText}>
                Excluir
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

overlay:{
flex:1,
backgroundColor:"rgba(0,0,0,0.55)",
justifyContent:"center",
alignItems:"center",
padding:25,
},

card:{
width:"100%",
backgroundColor:"#fff",
borderRadius:25,
padding:28,
},

iconCircle:{
width:90,
height:90,
borderRadius:45,
backgroundColor:"#FDECEC",
justifyContent:"center",
alignItems:"center",
alignSelf:"center",
marginBottom:20,
},

title:{
fontSize:30,
fontWeight:"800",
textAlign:"center",
color:"#1E293B",
},

subtitle:{
marginTop:15,
fontSize:17,
textAlign:"center",
color:"#64748B",
lineHeight:26,
},

buttons:{
flexDirection:"row",
marginTop:30,
},

cancel:{
flex:1,
height:55,
borderRadius:15,
borderWidth:1,
borderColor:"#D1D5DB",
justifyContent:"center",
alignItems:"center",
marginRight:10,
},

delete:{
flex:1,
height:55,
borderRadius:15,
backgroundColor:"#EF4444",
justifyContent:"center",
alignItems:"center",
},

cancelText:{
fontWeight:"700",
fontSize:18,
},

deleteText:{
color:"#fff",
fontWeight:"800",
fontSize:18,
},

});