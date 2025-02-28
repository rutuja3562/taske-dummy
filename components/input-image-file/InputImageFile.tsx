import React from "react";
import { View, Alert } from "react-native";
import LargeButton from "../large-button/LargeButton";
import { sendFileToServerForProcess } from "@/utility-functions/utilities";
import * as DocumentPicker from "expo-document-picker";

interface InputImageFileProps {
  onUploadSuccess: (fileName: string, fileUri: string) => void;
}

export const InputImageFile: React.FC<InputImageFileProps> = ({
  onUploadSuccess,
}) => {
  const handleDocumentUpload = async (documentId: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.canceled) return;

      const file = result.assets?.[0]; // Ensure file exists
      if (!file) {
        Alert.alert("Error", "No file selected.");
        return;
      }

      if (file.size && file.size > 20 * 1024 * 1024) {
        Alert.alert("Error", "Document size must be less than 20MB.");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.mimeType || "")) {
        Alert.alert("Error", "Document must be a JPEG or PNG file.");
        return;
      }

      const response = await sendFileToServerForProcess(
        file,
        "phone_" + documentId
      );
      if (!response?.data?.newFileName) {
        Alert.alert("Error", "Invalid server response.");
        return;
      }

      // Pass the uploaded file info back to HomeScreen
      onUploadSuccess(response.data.newFileName, file.uri);
    } catch (error) {
      console.error("Error uploading document:", error);
      Alert.alert("Error", "Failed to upload document.");
    }
  };

  return (
    <View>
      <LargeButton
        onButtonPress={() => handleDocumentUpload("docId")}
        buttonText="Add Image"
        disabled={false}
      />
    </View>
  );
};
