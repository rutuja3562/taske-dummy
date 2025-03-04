import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import {
  generateRandomColor,
  getInitials,
} from "@/utility-functions/utilities";
import { styles } from "./styles";
import CloseIcon from "@/assets/svg-icons/CloseIcon";

interface InputEntriesFromPhoneBookProps {
  onImportPhone: (selectedContacts: { name: string; phone: string }[]) => void;
}

export const InputEntriesFromPhoneBook: React.FC<
  InputEntriesFromPhoneBookProps
> = ({ onImportPhone }) => {
  const router = useRouter();
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedContacts, setSelectedContacts] = useState<
    { id: string; name: string; phone: string }[]
  >([]);
  const [contactColors, setContactColors] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoadingContacts, setIsLoadingContacts] = useState<boolean>(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoadingContacts(true);
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          });

          if (data.length > 0) {
            setContacts(data);
            setFilteredContacts(data);

            const colors: { [key: string]: string } = {};
            data.forEach((contact) => {
              const contactId = contact.id || `contact-${Math.random()}`;
              colors[contactId] = generateRandomColor();
            });
            setContactColors(colors);
          }
        }
      } catch (err) {
      } finally {
        setIsLoadingContacts(false);
      }
    };

    fetchContacts();
  }, []);

  const filterContacts = (query: string) => {
    setSearchQuery(query);
    setFilteredContacts(
      query
        ? contacts.filter((contact) =>
            contact.name?.toLowerCase().includes(query.toLowerCase())
          )
        : contacts
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredContacts(contacts);
  };

  const toggleContactSelection = (contact: {
    id: string;
    name: string;
    phoneNumbers?: { number: string }[];
  }) => {
    const phone = contact.phoneNumbers?.[0]?.number || "No Phone Number";
    setSelectedContacts((prevSelected) => {
      const isSelected = prevSelected.some((c) => c.id === contact.id);
      return isSelected
        ? prevSelected.filter((c) => c.id !== contact.id)
        : [...prevSelected, { id: contact.id, name: contact.name, phone }];
    });
  };

  const handleDone = () => {
    console.log("Contacts sent to HomeScreen:", selectedContacts);
    onImportPhone([...selectedContacts]);
    router.back();
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; phoneNumbers?: { number: string }[] };
  }) => {
    const initial = item.name ? getInitials(item.name) : "?";
    const contactColor = contactColors[item.id] || "#ccc";
    const phoneNumber = item.phoneNumbers?.[0]?.number || "No number";
    const isSelected = selectedContacts.some((c) => c.id === item.id);

    return (
      <TouchableOpacity
        onPress={() => toggleContactSelection(item)}
        style={[styles.contactRow, isSelected && styles.selectedContactRow]}
      >
        <View style={styles.profileAndName}>
          <View
            key={item.id}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 62,
              height: 62,
              borderRadius: 31,
              backgroundColor: contactColor,
              marginRight: 10,
            }}
          >
            <Text style={styles.initialText}>{initial}</Text>
          </View>

          <View style={[styles.nameAndNumberContainer]}>
            <Text style={styles.contactName} numberOfLines={1}>
              {item.name}
              yarn{" "}
            </Text>
            <Text style={styles.contactNumber}>{phoneNumber}</Text>
          </View>
        </View>

        <Text>{isSelected ? "✓ Selected" : "+ Add"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Add Customer</Text>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      {contacts.length > 0 && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            value={searchQuery}
            onChangeText={filterContacts}
          />
          {searchQuery.length > 0 && (
            <CloseIcon style={styles.closeCircle} onPress={clearSearch} />
          )}
        </View>
      )}
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
