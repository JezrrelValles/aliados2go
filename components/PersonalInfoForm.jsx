import { Alert, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import InfoCard from "./ui/InfoCard";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const phoneRegex = /^\d{10}$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("El nombre es obligatorio"),
  lastName: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  phone: Yup.string()
    .matches(phoneRegex, "Ingresa un teléfono válido")
    .required("El teléfono es obligatorio"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 número"
    )
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
  checked: Yup.bool().oneOf([true], "Debes aceptar las políticas"),
});

const PersonalInfoForm = ({ onNext }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const maxLength = 10;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        lada: "+52",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        checked: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const fullPhone = `${values.lada}${values.phone}`;
        onNext({ ...values, phone: fullPhone });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View className="p-4 gap-2">
          <InfoCard
            title="Información personal"
            subtitle="Completa todos los campos para continuar"
          />
          <View className="flex-row gap-4 pt-2">
            <View className="flex-1">
              <TextInput
                label="Nombre"
                placeholder="Ingresa tu nombre"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                mode="outlined"
                activeOutlineColor="#0235ED"
                outlineColor="#0235ED"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {touched.firstName && errors.firstName && (
                <Text className="text-red-600">{errors.firstName}</Text>
              )}
            </View>
            <View className="flex-1">
              <TextInput
                label="Apellido"
                placeholder="Ingresa tu apellido"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                mode="outlined"
                activeOutlineColor="#0235ED"
                outlineColor="#0235ED"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {touched.lastName && errors.lastName && (
                <Text className="text-red-600">{errors.lastName}</Text>
              )}
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-28">
              <Picker
                selectedValue={values.lada}
                onValueChange={(itemValue) => setFieldValue("lada", itemValue)}
                style={{
                  backgroundColor: "#F5F5F5",
                  borderWidth: 1,
                  borderColor: "#0235ED",
                  borderRadius: 8,
                }}
              >
                <Picker.Item label="+52" value="+52" />
                <Picker.Item label="+1" value="+1" />
              </Picker>
            </View>
            <View className="flex-1">
              <TextInput
                label="Teléfono"
                placeholder="Número de teléfono"
                value={values.phone}
                onChangeText={(text) => {
                  if (/^\d*$/.test(text) && text.length <= maxLength) {
                    setFieldValue("phone", text);
                  }
                }}
                onBlur={handleBlur("phone")}
                mode="outlined"
                keyboardType="phone-pad"
                activeOutlineColor="#0235ED"
                outlineColor="#0235ED"
                style={{ backgroundColor: "#F5F5F5" }}
              />
            </View>
          </View>
          {touched.phone && errors.phone && (
            <Text className="text-red-600">{errors.phone}</Text>
          )}

          <TextInput
            label="Correo Electrónico"
            placeholder="Ingresa tu correo electrónico"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            activeOutlineColor="#0235ED"
            outlineColor="#0235ED"
            style={{ backgroundColor: "#F5F5F5" }}
          />
          {touched.email && errors.email && (
            <Text className="text-red-600">{errors.email}</Text>
          )}

          <View className="flex-row gap-4 pb-4">
            <View className="flex-1">
              <TextInput
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                mode="outlined"
                secureTextEntry={showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye" : "eye-off"}
                    color="#262626"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                activeOutlineColor="#0235ED"
                outlineColor="#0235ED"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {touched.password && errors.password && (
                <Text className="text-red-600">{errors.password}</Text>
              )}
            </View>

            <View className="flex-1">
              <TextInput
                label="Confirmar Contraseña"
                placeholder="Confirma tu contraseña"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                mode="outlined"
                secureTextEntry={showConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye" : "eye-off"}
                    color="#262626"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                activeOutlineColor="#0235ED"
                outlineColor="#0235ED"
                style={{ backgroundColor: "#F5F5F5" }}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text className="text-red-600">{errors.confirmPassword}</Text>
              )}
            </View>
          </View>

          <View className="flex-row items-center gap-2 mb-4">
            <Checkbox
              status={values.checked ? "checked" : "unchecked"}
              onPress={() => setFieldValue("checked", !values.checked)}
              color="#0235ED"
            />
            <Text>
              Acepto las{" "}
              <Text className="underline">
                politicas de privacidad, términos y condiciones.
              </Text>
            </Text>
          </View>
          {touched.checked && errors.checked && (
            <Text className="text-red-600 mb-2">{errors.checked}</Text>
          )}

          <Button
            mode="elevated"
            onPress={handleSubmit}
            buttonColor="#0235ED"
            textColor="#F5F5F5"
            className="mb-2"
          >
            Siguiente
          </Button>
          <Button
            mode="elevated"
            onPress={() => router.replace("(auth)/login")}
            buttonColor="#F5F5F5"
            textColor="#0235ED"
          >
            Anterior
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default PersonalInfoForm;
