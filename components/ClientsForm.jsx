import { Alert, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import InfoCard from "./ui/InfoCard";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker"; // 👈 Importar Picker

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

// Ahora la validación se hace con lada + número
const phoneRegex = /^\d{10}$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("El nombre es obligatorio"),
  lastName: Yup.string().required("El apellido es obligatorio"),
  phone: Yup.string()
    .matches(phoneRegex, "Ingresa un teléfono válido con lada +52 o +1")
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

const ClientsForm = ({ onNext }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const maxLength = 10; // 👈 Solo números (sin lada)

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        lada: "+52", // 👈 Nuevo campo
        phone: "",
        password: "",
        confirmPassword: "",
        checked: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // concatenamos lada + telefono
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

          {/* Nombre y Apellido */}
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

          {/* Teléfono con LADA */}
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

          {/* Contraseñas */}
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

          {/* Checkbox */}
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

          {/* Botones */}
          <Button
            mode="elevated"
            onPress={() => router.push("/home")}
            buttonColor="#0235ED"
            textColor="#F5F5F5"
            className="mb-2"
          >
            Siguiente
          </Button>
          <Button
            mode="elevated"
            onPress={() => router.replace("/clients_login")}
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

export default ClientsForm;
