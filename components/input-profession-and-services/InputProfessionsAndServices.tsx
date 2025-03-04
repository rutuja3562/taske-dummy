import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Clipboard,
} from "react-native";
import CustomCheckBox from "../custom-check-box/CustomCheckBox";
import BlackArrowRight from "@/assets/svg-icons/BlackArrowRight";
import WhiteArrowDown from "@/assets/svg-icons/WhiteArrowDown";
import BlackArrowDown from "@/assets/svg-icons/BlackArrowDown";
import Clear from "@/assets/svg-icons/Clear";
import ClipBoard from "@/assets/svg-icons/ClipBoard";
import { styles } from "./styles";
import { Child, Profession, Subcategory } from "./professionData";
import LargeButtonOne from "../large-button-one/LargeButtonOne";

const InputProfessionsAndServices = ({
  professionsAndServicesData,
  onProfessionAndServicesChange,
}: {
  professionsAndServicesData: Profession[];
  onProfessionAndServicesChange: ({
    services,
    phone,
    profession,
    meta,
  }: any) => void;
}) => {
  const [data, setData] = useState(professionsAndServicesData);
  const [priceValues, setPriceValues] = useState<{ [key: string]: string }>({}); // State to track input values for each child
  const [timeValues, setTimeValues] = useState<{
    [key: string]: { hours: string; minutes: string };
  }>({});

  const toggleExpand = (id: string, level: number, parentId?: string) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (level === 1 && item.id === id) {
          return { ...item, expanded: !item.expanded };
        }
        if (level === 2 && item.id === parentId) {
          return {
            ...item,
            subcategories: item.subcategories.map((sub) =>
              sub.id === id ? { ...sub, expanded: !sub.expanded } : sub
            ),
          };
        }
        return item;
      })
    );
  };

  const updateSelection = <
    T extends {
      id: string;
      selected: boolean;
      expanded?: boolean;
      children?: Child[];
      subcategories?: Subcategory[];
    }
  >(
    items: T[],
    isSelected: boolean
  ): T[] => {
    return items.map((item) => ({
      ...item,
      selected: isSelected,
      expanded: item.expanded ?? false, // Ensure expanded remains defined
      subcategories: item.subcategories
        ? updateSelection(item.subcategories, isSelected)
        : undefined,
      children: item.children
        ? updateSelection(item.children, isSelected)
        : undefined,
    }));
  };

  const updateParentSelection = (updatedData: Profession[]): Profession[] => {
    return updatedData.map((profession) => {
      let allSubcategoriesSelected = true;

      const updatedSubcategories = profession.subcategories.map(
        (subcategory) => {
          let allChildrenSelected = true;
          let someChildrenSelected = false;

          const updatedChildren = subcategory.children.map((child) => {
            if (!child.selected) {
              allChildrenSelected = false;
            } else {
              someChildrenSelected = true;
            }
            return child;
          });

          if (!allChildrenSelected) {
            allSubcategoriesSelected = false;
          }

          return {
            ...subcategory,
            selected: allChildrenSelected, // Select subcategory only if all children are selected
            children: updatedChildren,
          };
        }
      );

      // If at least one subcategory is selected, profession should be partially selected
      const someSubcategoriesSelected = updatedSubcategories.some(
        (sub) => sub.selected
      );

      return {
        ...profession,
        selected: allSubcategoriesSelected,
        subcategories: updatedSubcategories,
      };
    });
  };

  // const toggleSelect = (id: string, level: number, parentId?: string) => {
  //   setData((prevData) => {
  //     const updatedData: Profession[] = prevData.map((profession) => {
  //       if (level === 1 && profession.id === id) {
  //         // Toggle profession selection and update subcategories
  //         const isSelected = !profession.selected;
  //         return {
  //           ...profession,
  //           selected: isSelected,
  //           subcategories: updateSelection(
  //             profession.subcategories,
  //             isSelected
  //           ),
  //         };
  //       }

  //       if (level === 2 && parentId && profession.id === parentId) {
  //         return {
  //           ...profession,
  //           subcategories: profession.subcategories.map((subcategory) => {
  //             if (subcategory.id === id) {
  //               const isSelected = !subcategory.selected;
  //               return {
  //                 ...subcategory,
  //                 selected: isSelected,
  //                 children: updateSelection(subcategory.children, isSelected),
  //               };
  //             }
  //             return subcategory;
  //           }),
  //         };
  //       }

  //       if (level === 3 && parentId) {
  //         return {
  //           ...profession,
  //           subcategories: profession.subcategories.map((subcategory) => {
  //             if (subcategory.id === parentId) {
  //               return {
  //                 ...subcategory,
  //                 children: subcategory.children.map((child) =>
  //                   child.id === id
  //                     ? { ...child, selected: !child.selected }
  //                     : child
  //                 ),
  //               };
  //             }
  //             return subcategory;
  //           }),
  //         };
  //       }

  //       return profession;
  //     });

  //     return updateParentSelection(updatedData); // Ensure parent updates correctly
  //   });
  // };

  const toggleSelect = (id: string, level: number, parentId?: string) => {
    setData((prevData) => {
      let updatedData = prevData.map((profession) => {
        if (level === 3 && parentId) {
          return {
            ...profession,
            subcategories: profession.subcategories.map((subcategory) => {
              if (subcategory.id === parentId) {
                return {
                  ...subcategory,
                  children: subcategory.children.map((child) => {
                    if (child.id === id) {
                      const isSelected = !child.selected;
                      if (!isSelected) {
                        // Reset price and time when deselecting
                        setPriceValues((prev) => {
                          const updatedPrices = { ...prev };
                          delete updatedPrices[id];
                          return updatedPrices;
                        });

                        setTimeValues((prev) => {
                          const updatedTimes = { ...prev };
                          delete updatedTimes[id];
                          return updatedTimes;
                        });
                      }
                      return { ...child, selected: isSelected };
                    }
                    return child;
                  }),
                };
              }
              return subcategory;
            }),
          };
        }
        return profession;
      });

      return updateParentSelection(updatedData);
    });
  };

  // --------------------------------------------------------------------------------------

  const handleInputChange = (id: string, value: string) => {
    setPriceValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    setData((prevData) =>
      prevData.map((profession) => ({
        ...profession,
        subcategories: profession.subcategories.map((subcategory) => ({
          ...subcategory,
          children: subcategory.children.map((child) =>
            child.id === id ? { ...child, price: parseInt(value) || 0 } : child
          ),
        })),
      }))
    );
  };

  const handleCopyPrice = (id: string) => {
    const valueToCopy = priceValues[id] || "0"; // Get the copied price
    Clipboard.setString(valueToCopy);

    setData((prevData) =>
      prevData.map((profession) => ({
        ...profession,
        subcategories: profession.subcategories.map((subcategory) => ({
          ...subcategory,
          children: subcategory.children.map((child) =>
            child.selected ? { ...child, price: parseInt(valueToCopy) } : child
          ),
        })),
      }))
    );
    // console.log("data>>>", JSON.stringify(data));
    setPriceValues((prevValues) => {
      const updatedPriceValues = { ...prevValues };
      data.forEach((profession) =>
        profession.subcategories.forEach((subcategory) =>
          subcategory.children.forEach((child) => {
            if (child.selected) {
              updatedPriceValues[child.id] = valueToCopy;
            }
          })
        )
      );
      return updatedPriceValues;
    });
  };

  const onClearPrice = (id: string) => {
    setPriceValues((prevValues) => ({
      ...prevValues,
      [id]: "0",
    }));
    setData((prevData) =>
      prevData.map((profession) => ({
        ...profession,
        subcategories: profession.subcategories.map((subcategory) => ({
          ...subcategory,
          children: subcategory.children.map((child) =>
            child.id === id ? { ...child, price: 0 } : child
          ),
        })),
      }))
    );
  };

  const handleTimeChange = (
    id: string,
    type: "hours" | "minutes",
    value: string
  ) => {
    // Allow only numbers, and limit length to 2 characters
    let sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 2);

    // Prevent leading zero issues
    if (sanitizedValue.length === 2 && sanitizedValue.startsWith("0")) {
      sanitizedValue = sanitizedValue[1];
    }

    setTimeValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [type]: sanitizedValue,
      },
    }));
  };

  const handleCopyTime = (id: string) => {
    const { hours = "00", minutes = "00" } = timeValues[id] || {
      hours: "00",
      minutes: "00",
    };

    setData((prevData) =>
      prevData.map((profession) => ({
        ...profession,
        subcategories: profession.subcategories.map((subcategory) => ({
          ...subcategory,
          children: subcategory.children.map((child) =>
            child.selected
              ? { ...child, timeInHours: { hours, minutes } }
              : child
          ),
        })),
      }))
    );

    setTimeValues((prevValues) => {
      const updatedTimeValues = { ...prevValues };
      data.forEach((profession) =>
        profession.subcategories.forEach((subcategory) =>
          subcategory.children.forEach((child) => {
            if (child.selected) {
              updatedTimeValues[child.id] = { hours, minutes };
            }
          })
        )
      );
      return updatedTimeValues;
    });
  };

  const onClearTime = (id: string) => {
    setTimeValues((prevValues) => ({
      ...prevValues,
      [id]: { hours: "", minutes: "" }, // Set to empty instead of "00"
    }));

    setData((prevData) =>
      prevData.map((profession) => ({
        ...profession,
        subcategories: profession.subcategories.map((subcategory) => ({
          ...subcategory,
          children: subcategory.children.map((child) =>
            child.id === id
              ? { ...child, timeInHours: { hours: "", minutes: "" } }
              : child
          ),
        })),
      }))
    );
  };

  const isAnyCheckboxSelected = (data: Profession[]) => {
    return data.some(
      (profession) =>
        profession.selected ||
        profession.subcategories.some(
          (sub) => sub.selected || sub.children.some((child) => child.selected)
        )
    );
  };

  // --------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.professionsContainer}>
            {/* Profession Header */}
            <TouchableOpacity
              style={[
                styles.professionContainer,
                item.expanded && styles.professionExpanded, // Change style when expanded
              ]}
              onPress={() => toggleExpand(item.id, 1)}
            >
              {item.expanded ? <WhiteArrowDown /> : <BlackArrowRight />}
              <Text
                style={[
                  styles.professionText,
                  item.expanded && styles.professionTextExpanded,
                ]}
              >
                {item.name}
              </Text>
              <CustomCheckBox
                checked={item.selected}
                onPress={() => toggleSelect(item.id, 1)}
              />
            </TouchableOpacity>

            {/* Subcategories */}

            {item.expanded &&
              item.subcategories.map((sub) => (
                <View key={sub.id}>
                  <TouchableOpacity
                    style={[
                      styles.subcategoryContainer,
                      sub.expanded && styles.subcategoryExpanded,
                    ]}
                    onPress={() => toggleExpand(sub.id, 2, item.id)}
                  >
                    {sub.expanded ? <BlackArrowDown /> : <BlackArrowRight />}
                    <Text style={styles.subcategoryText}>{sub.name}</Text>
                    <CustomCheckBox
                      checked={sub.selected}
                      onPress={() => toggleSelect(sub.id, 2, item.id)}
                    />
                  </TouchableOpacity>

                  {/* Child Categories */}
                  <View style={{ marginBottom: 15 }}>
                    {sub.expanded &&
                      sub.children.map((child) => (
                        <View style={styles.childCategoriesContainer}>
                          <TouchableOpacity
                            key={child.id}
                            style={styles.childCategoryContainer}
                            onPress={() => toggleSelect(child.id, 3, sub.id)}
                          >
                            <Text style={styles.childCategoryText}>
                              {child.name}
                            </Text>
                            <CustomCheckBox
                              checked={child.selected}
                              onPress={() => toggleSelect(child.id, 3, sub.id)}
                            />
                          </TouchableOpacity>
                          <View style={styles.row}>
                            <View
                              style={{
                                flex: 1,
                              }}
                            >
                              <Text style={styles.helpingLabel}>
                                Service Cost
                              </Text>
                              <View style={styles.costContainer}>
                                <View style={styles.currencyContainer}>
                                  <Text style={styles.currency}>₹</Text>
                                  <TextInput
                                    style={styles.costInput}
                                    value={priceValues[child.id] ?? "0"}
                                    keyboardType="numeric"
                                    onChangeText={(value) =>
                                      handleInputChange(child.id, value)
                                    }
                                  />
                                </View>
                                <TouchableOpacity
                                  style={styles.iconButton}
                                  onPress={() => onClearPrice(child.id)}
                                >
                                  <Clear color="#90C9FF" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={styles.iconButton}
                                  onPress={() => handleCopyPrice(child.id)}
                                >
                                  <ClipBoard />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.serviceTimeContainer}>
                              <Text style={styles.helpingLabel}>
                                Service Time
                              </Text>
                              <View style={styles.timeContainer}>
                                <View style={styles.timeBox}>
                                  <TextInput
                                    style={styles.timeInput}
                                    value={timeValues[child.id]?.hours || "00"}
                                    keyboardType="numeric"
                                    onChangeText={(value) =>
                                      handleTimeChange(child.id, "hours", value)
                                    }
                                    // maxLength={2}
                                  />
                                </View>
                                <Text style={styles.timeLabel}>hr</Text>
                                <View style={styles.timeBox}>
                                  <TextInput
                                    style={styles.timeInput}
                                    value={
                                      timeValues[child.id]?.minutes || "00"
                                    }
                                    keyboardType="numeric"
                                    onChangeText={(value) =>
                                      handleTimeChange(
                                        child.id,
                                        "minutes",
                                        value
                                      )
                                    }
                                    // maxLength={2}
                                  />
                                </View>
                                <Text style={styles.timeLabel}>min</Text>
                                <TouchableOpacity
                                  style={styles.iconButton}
                                  onPress={() => onClearTime(child.id)}
                                >
                                  <Clear color="#90C9FF" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={styles.iconButton}
                                  onPress={() => handleCopyTime(child.id)}
                                >
                                  <ClipBoard />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              ))}
          </View>
        )}
      />
      {isAnyCheckboxSelected(data) && (
        <LargeButtonOne
          buttonText="Continue"
          onButtonPress={() => {
            const getSelectedData = (data: Profession[]) => {
              return data
                .filter(
                  (profession) =>
                    profession.selected ||
                    profession.subcategories.some(
                      (sub) =>
                        sub.selected ||
                        sub.children.some((child) => child.selected)
                    )
                )
                .map((profession) => ({
                  ...profession,
                  subcategories: profession.subcategories
                    .filter(
                      (sub) =>
                        sub.selected ||
                        sub.children.some((child) => child.selected)
                    )
                    .map((sub) => ({
                      ...sub,
                      children: sub.children.filter((child) => child.selected),
                    })),
                }));
            };
            onProfessionAndServicesChange({
              services: getSelectedData(data),
              phone: "phone",
              profession: "profession",
              meta: "meta data",
            });
          }}
        />
      )}
    </View>
  );
};

export default InputProfessionsAndServices;
