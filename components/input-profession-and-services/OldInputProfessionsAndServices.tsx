import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
} from "react-native";
// import LargeButton from "../large-button/LargeButton";
import { styles } from "./oldInputProfessionsAndServicesstyles";
import { Color } from "@/assets/theme";
import CustomCheckBox from "../custom-check-box/CustomCheckBox";
import { router } from "expo-router";
import { TextInput } from "react-native";
import CopyIcon from "@/assets/svg-icons/CopyIcon";
import Close from "@/assets/svg-icons/Close";
import Collapsible from "react-native-collapsible";
import TickMark from "@/assets/svg-icons/TickMark";
import LargeButtonOne from "../large-button-one/LargeButtonOne";

type Service = {
  id: string;
  name: string;
  parentServiceId: string | null;
  price: number;
  timeInHours?: number;
};

type TransformedService = {
  profession: { id: string; name: string; isParent: true };
  parent: { id: string; name: string; isParent: true };
  children: {
    id: string;
    name: string;
    isParent: false;
    price: number;
    timeInHours?: number;
  }[];
};

type OldInputProfessionsAndServicesProps = {
  data: any;
  onSaveProfessionAndServices: ({
    services,
    phone,
    profession,
    meta,
  }: any) => void;
};
export const OldInputProfessionsAndServices: React.FC<
  OldInputProfessionsAndServicesProps
> = ({ data, onSaveProfessionAndServices }) => {
  const [checkedParents, setCheckedParents] = useState<string[]>([]);
  const [checkedChildren, setCheckedChildren] = useState<string[]>([]);
  const [transformedServices, setTransformedServices] =
    useState<TransformedService[]>();
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({}); // State to track input values for each child
  const [timeValues, setTimeValues] = useState<{ [key: string]: string }>({}); // State to track input values for each child
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const handleParentCheck = (parent: { id: string; name: string }) => {
    if (checkedParents.includes(parent.id)) {
      setCheckedParents(checkedParents.filter((id) => id !== parent.id));
      const updatedCheckedChildren = checkedChildren.filter((childId) => {
        const parentService = transformedServices?.find(
          (ts) => ts.parent.id === parent.id
        );
        return !parentService?.children.some((child) => child.id === childId);
      });
      setCheckedChildren(updatedCheckedChildren);
    } else {
      setCheckedParents([...checkedParents, parent.id]);
      const parentService = transformedServices?.find(
        (ts) => ts.parent.id === parent.id
      );
      const newCheckedChildren =
        parentService?.children.map((child) => child.id) || [];
      setCheckedChildren([...checkedChildren, ...newCheckedChildren]);
    }
  };

  const handleToggleOpen = (id: string) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  const handleChildCheck = (child: { id: string; name: string }) => {
    if (checkedChildren.includes(child.id)) {
      setCheckedChildren(checkedChildren.filter((id) => id !== child.id));
      const parentService = transformedServices?.find((ts) =>
        ts.children.some((c) => c.id === child.id)
      );
      if (parentService) {
        const allChildrenChecked = parentService.children.every((c) =>
          checkedChildren.includes(c.id)
        );
        if (!allChildrenChecked) {
          setCheckedParents(
            checkedParents.filter((id) => id !== parentService.parent.id)
          );
        }
      }
    } else {
      setCheckedChildren([...checkedChildren, child.id]);
      const parentService = transformedServices?.find((ts) =>
        ts.children.some((c) => c.id === child.id)
      );
      if (parentService) {
        const allChildrenChecked = parentService.children.every((c) =>
          checkedChildren.includes(c.id)
        );
        if (allChildrenChecked) {
          setCheckedParents([...checkedParents, parentService.parent.id]);
        }
      }
    }
  };

  const transformServices = (services: Service[]): TransformedService[] => {
    const grouped: { [key: string]: TransformedService } = {};

    services.forEach((service) => {
      if (service.parentServiceId === null) {
        grouped[service.id] = {
          profession: { id: service.id, name: service.name, isParent: true },
          parent: { id: service.id, name: service.name, isParent: true },
          children: [],
        };
      } else {
        if (grouped[service.parentServiceId]) {
          grouped[service.parentServiceId].children.push({
            id: service.id,
            name: service.name,
            isParent: false,
            price: service.price,
            timeInHours: service.timeInHours,
          });
        }
      }
    });
    return Object.values(grouped);
  };

  useEffect(() => {
    if (data?.meta?.services) {
      const transformed = transformServices(data?.meta?.services as Service[]);
      setTransformedServices(transformed);
    }
    if (data?.userDetails?.vendorServices) {
      const initialCheckedParents: string[] = [];
      const initialCheckedChildren: string[] = [];
      data?.userDetails?.vendorServices.forEach((service: any) => {
        initialCheckedParents.push(service.serviceId);
        initialCheckedChildren.push(service.serviceId);
      });
      setCheckedParents(initialCheckedParents);
      setCheckedChildren(initialCheckedChildren);
    }
  }, [data?.meta?.services, data?.userDetails?.vendorServices]);

  // --------------------------------------------------------------------------------------
  const handleInputChange = (id: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const copyCode = (id: string) => {
    const valueToCopy = inputValues[id] || "";
    Clipboard.setString(valueToCopy);

    const updatedInputValues = { ...inputValues };
    checkedChildren.forEach((childId) => {
      updatedInputValues[childId] = valueToCopy;
    });

    setInputValues(updatedInputValues);
  };

  const onClearPrice = () => {
    const updatedInputValues = { ...inputValues };
    checkedChildren.forEach((childId) => {
      updatedInputValues[childId] = "";
    });

    setInputValues(updatedInputValues);
  };

  const handleTimeChange = (id: string, value: string) => {
    setTimeValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const copyTime = (id: string) => {
    const valueToCopy = timeValues[id] || "";
    Clipboard.setString(valueToCopy);
    const updatedTimeValues = { ...timeValues };
    checkedChildren.forEach((childId) => {
      updatedTimeValues[childId] = valueToCopy;
    });
    setTimeValues(updatedTimeValues);
  };

  const onClearTime = () => {
    const updatedTimeValues = { ...timeValues };
    checkedChildren.forEach((childId) => {
      updatedTimeValues[childId] = "";
    });
    setTimeValues(updatedTimeValues);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {transformedServices
            ?.sort((a, b) => a.parent.name.localeCompare(b.parent.name))
            .map((item, index) => (
              <View key={item.parent.id}>
                <TouchableOpacity
                  onPress={() => {
                    handleToggleOpen(item.parent.id);
                  }}
                >
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxTextParent}>
                      {item.parent.name}
                    </Text>
                    <CustomCheckBox
                      checked={checkedParents.includes(item.parent.id)}
                      onPress={() => {
                        handleParentCheck(item.parent);
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <Collapsible collapsed={openItemId !== item.parent.id}>
                  <View style={styles.childContainer}>
                    {item.children
                      ?.sort((a, b) => a.name.localeCompare(b.name))
                      .map((c, idx) => (
                        <>
                          <View
                            key={c.id}
                            style={[
                              styles.checkboxChildContainer,
                              styles.childCheckbox,
                            ]}
                          >
                            <Text style={styles.checkboxText}>{c.name}</Text>
                            {checkedChildren.includes(c.id) && (
                              <>
                                <Text>₹</Text>
                                <TextInput
                                  placeholder="Price"
                                  style={styles.priceInput}
                                  keyboardType="number-pad"
                                  value={inputValues[c.id] ?? "100"}
                                  onChangeText={(value) =>
                                    handleInputChange(c.id, value)
                                  }
                                />
                                <>
                                  <CopyIcon
                                    style={styles.copyIcon}
                                    onPress={() => copyCode(c.id)}
                                  />
                                  <Close
                                    style={styles.close}
                                    onPress={onClearPrice}
                                  />
                                </>
                              </>
                            )}
                            <CustomCheckBox
                              checked={checkedChildren.includes(c.id)}
                              onPress={() => handleChildCheck(c)}
                            />
                          </View>
                          {checkedChildren.includes(c.id) && (
                            <View style={styles.timeInputContainer}>
                              <TextInput
                                placeholder="Time"
                                style={styles.priceInput}
                                value={timeValues[c.id] ?? "1"}
                                onChangeText={(value) =>
                                  handleTimeChange(c.id, value)
                                }
                              />
                              <>
                                <CopyIcon
                                  style={styles.copyIcon}
                                  onPress={() => copyTime(c.id)}
                                />
                                <Close
                                  style={styles.close}
                                  onPress={onClearTime}
                                />
                              </>
                            </View>
                          )}
                        </>
                      ))}
                  </View>
                </Collapsible>
              </View>
            ))}
        </ScrollView>
        {checkedChildren.length > 0 && (
          <View
            style={{ display: "flex", alignItems: "center", marginBottom: 45 }}
          >
            <LargeButtonOne
              buttonText={"Continue"}
              onButtonPress={() => {
                // Log price and corresponding ID
                const servicesToLog = [
                  ...checkedParents.map((id) => ({
                    id,
                    name: "",
                    price: 100, // Assuming a fixed price for parents
                    timeInHours: 1,
                  })),
                  ...checkedChildren.map((id) => ({
                    id,
                    name: "",
                    price: parseInt(inputValues[id]) || 100, // Use input value or default to 100
                    timeInHours: parseInt(timeValues[id]) || 1,
                  })),
                ];
                servicesToLog.forEach((service) => {
                  console.log(
                    `ID: ${service.id}, Price: ${service.price}, Time:${service.timeInHours}`
                  );
                });
                onSaveProfessionAndServices({
                  services: servicesToLog,
                  phone: data?.phone,
                  profession: data?.profession,
                  meta: data?.meta,
                });
                // alert("servicesToLog>>>" + JSON.stringify(servicesToLog));
                // addServices(
                //   servicesToLog,
                //   data?.phone,
                //   data?.profession,
                //   data?.meta
                // );
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};
