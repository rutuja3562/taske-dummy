// import React, { useCallback, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import * as Contacts from "expo-contacts";
// // import LargeButtonOne from "@/components/large-button-one/LargeButtonOne";
// import { useRouter } from "expo-router";
// // import HeaderOne from "@/components/header-one/HeaderOne";
// import { Ionicons } from "@expo/vector-icons";
// import { Color, Font, FontSize, Styles } from "@/assets/theme";
// import {
//   generateRandomColor,
//   getInitials,
// } from "@/utility-functions/utilities";
// // import { unloadCustomers } from "@/actors/customers-client";
// // import { addCustomer, unloadCustomer } from "@/actors/customer-client";
// import { useOnHardwareBackAction } from "@/utils/modulo-hooks";
// import { styles } from "./styles";
// import CloseIcon from "@/assets/svg-icons/CloseIcon";
// import { Screens } from "@/utility-functions/types";
// // import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner";

// interface InputEntriesFromPhoneBookProps {
//   onImportPhone: () => void;
// }

// const InputEntriesFromPhoneBook: React.FC<
//   InputEntriesFromPhoneBookProps
// > = () => {
//   const router = useRouter();
//   const [contacts, setContacts] = useState<any[]>([]);
//   const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [selectedContactId, setSelectedContactId] = useState<string | null>(
//     null
//   );
//   const [contactColors, setContactColors] = useState<{ [key: string]: string }>(
//     {}
//   );
//   const [isLoadingContacts, setIsLoadingContacts] = useState<boolean>(false);

//   const goBack = useCallback(() => {
//     // unloadCustomers();
//     // unloadCustomer();
//     router.back();
//     return true;
//   }, []);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       setIsLoadingContacts(true);
//       try {
//         const { status } = await Contacts.requestPermissionsAsync();
//         if (status === "granted") {
//           const { data } = await Contacts.getContactsAsync({
//             fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
//           });
//           if (data.length > 0) {
//             setContacts(data);
//             setFilteredContacts(data); // Set initial filtered contacts to the full list
//             const colors: { [key: string]: string } = {};
//             data.forEach((contact) => {
//               const contactId = contact.id || `contact-${Math.random()}`;
//               colors[contactId] = generateRandomColor();
//             });
//             setContactColors(colors);
//           }
//         }
//       } catch (err) {
//       } finally {
//         setIsLoadingContacts(false);
//       }
//     };

//     fetchContacts();
//   }, []);

//   /**
//    * Filter contacts based on the search query.
//    */
//   const filterContacts = useCallback(
//     (query: string) => {
//       setSearchQuery(query);
//       if (!query) {
//         setFilteredContacts(contacts);
//       } else {
//         const filtered = contacts.filter((contact) =>
//           contact.name?.toLowerCase().includes(query.toLowerCase())
//         );
//         setFilteredContacts(filtered);
//       }
//     },
//     [contacts]
//   );

//   /**
//    * Clear the search input and reset the contact list.
//    */
//   const clearSearch = () => {
//     setSearchQuery("");
//     setFilteredContacts(contacts);
//   };

//   const handleDone = () => {
//     const selectedContact = contacts.find(
//       (contact) => contact.id === selectedContactId
//     );
//     if (selectedContact) {
//       const name = selectedContact.name || "Unnamed Contact";
//       const phone =
//         selectedContact.phoneNumbers?.[0]?.number || "No Phone Number";

//       // addCustomer();
//       router.push({
//         pathname: Screens.AddEditCustomers as any,
//         params: {
//           data: JSON.stringify({
//             type: "add-contact",
//             data: {
//               name: name,
//               phone: phone
//                 .split("+91")
//                 .join("")
//                 .split(" ")
//                 .filter((w: string) => w !== "")
//                 .join(""),
//             },
//           }),
//         },
//       });
//     } else {
//       console.warn("No contact selected");
//     }
//   };

//   const onLeftIconPress = () => {
//     goBack();
//   };

//   const onRightIconPress = () => {
//     goBack();
//   };

//   const toggleContactSelection = (id: string) => {
//     setSelectedContactId((prevSelectedId) =>
//       prevSelectedId === id ? null : id
//     );
//   };

//   useOnHardwareBackAction(goBack);

//   const renderItem = ({
//     item,
//     index,
//   }: {
//     item: { id: string; name: string; phoneNumbers?: { number: string }[] };
//     index: number;
//   }) => {
//     const initial = item.name ? getInitials(item.name) : "?";
//     const contactColor = contactColors[item.id] || "#ccc";
//     const phoneNumber = item.phoneNumbers?.[0]?.number || "No number";

//     const handleAddClick = () => {
//       setSelectedContactId(item.id);
//       handleDone();
//     };

//     return (
//       <TouchableOpacity
//         onPress={() => toggleContactSelection(item.id)}
//         style={index % 2 === 0 ? [styles.contactRow] : [styles.contactRowOdd]}
//       >
//         <View style={styles.profileAndName}>
//           <View
//             key={item.id}
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//               width: 62,
//               height: 62,
//               borderRadius: 31,
//               backgroundColor: contactColor,
//               marginRight: 10,
//             }}
//           >
//             <Text style={styles.initialText}>{initial}</Text>
//           </View>

//           <View style={[styles.nameAndNumberContainer]}>
//             <Text style={styles.contactName} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <Text style={styles.contactNumber}>{phoneNumber}</Text>
//           </View>
//         </View>

//         <TouchableOpacity onPress={handleAddClick}>
//           <Text>+ Add</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };

//   const selectedContactName =
//     contacts.find((contact) => contact.id === selectedContactId)?.name || "";

//   return (
//     <>
//       {/* <View style={styles.headerContainer}>
//         <HeaderOne
//           onLeftIconPress={onLeftIconPress}
//           onRightIconPress={onRightIconPress}
//         />
//       </View>

//       {isLoadingContacts && <LoadingSpinner />} */}

//       {!isLoadingContacts && (
//         <>
//           <View style={styles.container}>
//             <View style={styles.header}>
//               <Text style={styles.title}>Add customer</Text>
//             </View>

//             {contacts.length > 0 && (
//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.searchInput}
//                   placeholder="Search contacts..."
//                   value={searchQuery}
//                   onChangeText={filterContacts}
//                 />
//                 {searchQuery.length > 0 && (
//                   <CloseIcon style={styles.closeCircle} onPress={clearSearch} />
//                 )}
//               </View>
//             )}

//             {/* {filteredContacts.length > 0 && ( */}
//             <FlatList
//               data={filteredContacts}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id}
//             />
//             {/* // )} */}
//             {filteredContacts.length < 1 && (
//               <Text>
//                 No contacts found
//                 {searchQuery.length > 0 ? " matching this search criteria" : ""}
//               </Text>
//             )}
//             {/* <LargeButtonOne
//               buttonText={
//                 selectedContactId ? `Add ${selectedContactName}` : "Add"
//               }
//               onButtonPress={handleDone}
//               disabled={!selectedContactId}
//             /> */}
//           </View>
//         </>
//       )}
//     </>
//   );
// };
// export default InputEntriesFromPhoneBook;
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

const InputEntriesFromPhoneBook: React.FC<InputEntriesFromPhoneBookProps> = ({
  onImportPhone,
}) => {
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
        {/* <TouchableOpacity>
          <Text>{isSelected ? "✓ Selected" : "+ Add"}</Text>
        </TouchableOpacity> */}
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

export default InputEntriesFromPhoneBook;
