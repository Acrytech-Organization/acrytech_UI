import { getDropdownValue, getInitialInputProps } from "../../Helpers/helpers";
import { getCategoryOptions } from "../../Helpers/helpers"
import { TextInput } from "../GenericComponents/Inputs/TextInput";
import { MaxImageSizeMB, SchemaTypes } from "../../Helpers/ExtraProperties";
import UserLevelDropDown from "../User/UserLevel/UserLevelDropDown";
import GenericRadioButton from "../GenericComponents/RadioButton/GenericRadioButton";
import StaticDropDown from "../GenericComponents/DropDown/StaticDropDown";
import ProductDropDown from "../Product/ProductDropDown";
import CustomerDropDown from "../Customer/CustomerDropDown";
import InquirySourcesDropdown from "../Sources/InquirySourcesDropdown";
import FileInput from "../GenericComponents/Inputs/FileInput";
import { PhoneNumberInput } from "../GenericComponents/Inputs/PhoneNumber";
import DiscountDropdown from "../Discount/DiscountDropdown";
import VendorDropDown from "../Party/VendorDropDown";
import LabeledText from "../GenericComponents/Inputs/LabeledText";
import AllPartyDropDown from "../Party/AllPartyDropDown";
import CheckboxComponent from "../GenericComponents/Buttons/Checkbox";
import { NetworkImageInput } from "../GenericComponents/Inputs/NetworkImage";
import BankDropDown from "../Bank/BankDropDown";
import LabourDropDown from "../Party/LabourDropDown";
import RMDropDown from "../Product/RMDropDown";
import CustomDatePicker from "../GenericComponents/Inputs/DatePicker";

function AddProperty(props) {
  let controlProps = getInitialInputProps(props);
  switch (props.data.item.type) {
    case SchemaTypes.USER_LEVEL_DROPDOWN:
      return (
        <UserLevelDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) =>
            props.onChange({
              name: props.data.item.name,
              value: selectedItem,
            })
          }
        />
      );
    case SchemaTypes.RADIO_BUTTON:
      return (
        <GenericRadioButton
          data={props.data}
          options={getCategoryOptions(props.data.item.category_object)}
          onChange={(selectedItem) =>
            props.onChange({
              name: props.data.item.name,
              value: selectedItem,
            })}
          selectedValue={props.currentValue}
        />
      );
    case SchemaTypes.STATICDROPDOWN:
      return (
        <StaticDropDown
          currentValue={props.currentValue}
          props={props}
          attributes={props.data.attributes}
        />
      )
    case SchemaTypes.PRODUCTDROPDOWN:
      return (
        <ProductDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange({
              name: props.data.item.name,
              value: selectedItem,
            })
          }
          }
        />
      )
    case SchemaTypes.RMDROPDOWN:
      return (
        <RMDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange({
              name: props.data.item.name,
              value: selectedItem,
            })
          }
          }
        />
      )
    case SchemaTypes.BANKDROPDOWN:
      return (
        <BankDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange({
              name: props.data.item.name,
              value: selectedItem,
            })
          }
          }
        />
      )
    case SchemaTypes.CUSTOMERDROPDOWN:
      return (
        <CustomerDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange(
              getDropdownValue(selectedItem, props.data.item.name)
            )
          }
          }
        />
      )
    case SchemaTypes.VENDORDROPDOWN:
      return (
        <VendorDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange({ name: props.data.item.name, value: selectedItem })
          }}
        />
      )
    case SchemaTypes.LABOURDROPDOWN:
      return (
        <LabourDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange({ name: props.data.item.name, value: selectedItem })
          }}
        />
      )
    case SchemaTypes.PARTYDROPDOWN:
      return (
        <AllPartyDropDown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) => {
            props.onChange({ name: props.data.item.name, value: selectedItem })
          }}
        />
      )
    case SchemaTypes.INQUIRYSOURCEDROPDOWN:
      return (
        <InquirySourcesDropdown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) =>
            props.onChange({
              name: props.data.item.name,
              value: selectedItem,
            })
          }
        />
      )
    case SchemaTypes.DATEPICKER:
      return (
        <CustomDatePicker
          props={props}
          controlProps={controlProps}
        />
      )
    case SchemaTypes.DISCOUNT_SLAB_DROPDOWN:
      return (
        <DiscountDropdown
          props={props}
          currentValue={props.currentValue}
          attributes={props.data.attributes}
          getSelected={(selectedItem) =>
            props.onChange(
              getDropdownValue(selectedItem, props.data.item.name)
            )
          }
        />
      )
    case SchemaTypes.IMAGE:
      return (
        <FileInput
          controlProps={controlProps}
          filetype={SchemaTypes.file}
          RestrictedSize={MaxImageSizeMB}
          props={props}
        />
      )
    case SchemaTypes.NETWORK_IMAGE:
      return (
        <NetworkImageInput
          currentValue={props.currentValue}
          controlProps={controlProps}
          props={props}
        />
      )
    case SchemaTypes.PHONE_NUMBER:
      return (
        <PhoneNumberInput props={props} controlProps={controlProps} />
      )
    case SchemaTypes.LABELED_TEXT:
      return (
        <LabeledText data={props.data} currentValue={props.currentValue} />
      )
    case SchemaTypes.checkbox:
      return (
        <CheckboxComponent
          currentValue={props.currentValue}
          onChange={(e) => props.onChange({
            name: props.data.item.name,
            value: e.target.checked
          })}
          attributes={props.data.attributes}
          props={props}
        />
      )
    case SchemaTypes.SALERATE:
      if (!props.state.saleRate) {
        controlProps = { ...controlProps, value: props.state?.product?.saleRate || '' }
      }
      return <TextInput props={props} controlProps={controlProps} />;
    default:
      return <TextInput props={props} controlProps={controlProps} />;
  }
}

export default AddProperty;