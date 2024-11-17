import { defineRule } from "vee-validate";

const endsWithSpecialSymbol = (value: string): boolean => {
  return /[ ,.!?']$/i.test(value);
};

const startsWithSpecialSymbol = (value: string): boolean => {
  return /^[ ,.!?']/i.test(value);
};

defineRule('email', (value: String) =>{
    if(!value){
        return 'Elektroninis paštas negali būti tuščias.'
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value as string)) {
        return 'Elektroninis paštas yra neteisingas';
    }
    return true
})

defineRule('name', (value: String) =>{
  if(!value){
      return 'Vardas negali būti tuščias laukas.'
  }
  if(value.length > 25){
    return 'Vardas negali būti ilgesnis nei 25 simboliai.'
  }
  if(value.length < 2){
    return 'Vardas turi būti ilgesnis nei 2 simboliai.'
  }
  const regex = /^(([\\p{L}]|[a-z])*[ ]?([\\p{L}]|[a-z])*)$/i
  if (!regex.test(value as string)) {
    return 'Vardas negali turėti specialių simbolių ar skaičių.';
  }
  if(endsWithSpecialSymbol(value as string)){
    return 'Vardas negali pasibaigti specialiu simboliu.';
  }
  if(startsWithSpecialSymbol(value as string)){
    return 'Vardas negali prasidėti specialiu simboliu.';
  }
  return true
})

defineRule('surname', (value: String) =>{
  if(!value){
      return 'Pavardė negali būti tuščias laukas.'
  }
  if(value.length > 35){
    return 'Pavardė negali būti ilgesnė nei 35 simboliai.'
  }
  if(value.length < 4){
    return 'Pavardė turi būti ilgesnė nei 4 simboliai.'
  }
  const regex = /^(([\\p{L}]|[a-z])*[ ]?([\\p{L}]|[a-z])*)$/i
  if (!regex.test(value as string)) {
    return 'Pavardė negali turėti specialių simbolių ar skaičių.';
  }
  if(endsWithSpecialSymbol(value as string)){
    return 'Pavardė negali pasibaigti specialiu simboliu.';
  }
  if(startsWithSpecialSymbol(value as string)){
    return 'Pavardė negali prasidėti specialiu simboliu.';
  }
  return true
})

defineRule('company', (value: String) =>{
  if(!value){
      return 'Kompanija negali būti tuščias laukas.'
  }
  if(value.length > 40){
    return 'Kompanija negali būti ilgesnė nei 40 simboliai.'
  }
  if(value.length < 4){
    return 'Kompanija turi būti ilgesnė nei 4 simboliai.'
  }
  if(endsWithSpecialSymbol(value as string)){
    return 'Kompanija negali pasibaigti specialiu simboliu.';
  }
  if(startsWithSpecialSymbol(value as string)){
    return 'Kompanija negali prasidėti specialiu simboliu.';
  }
  const regex = /^([a-zA-Z]+(?:[ ,.!']{1,2}[a-zA-Z]+)*)$/i
  if (!regex.test(value as string)) {
    return 'Kompanija negali turėti specialių simbolių ar skaičių.';
  }
  
  return true
})

defineRule('position', (value: String) =>{
  if(!value){
      return 'Pozicija negali būti tuščias laukas.'
  }
  if(value.length > 40){
    return 'Pozicija negali būti ilgesnė nei 40 simboliai.'
  }
  if(value.length < 4){
    return 'Pozicija turi būti ilgesnė nei 4 simboliai.'
  }
  if(endsWithSpecialSymbol(value as string)){
    return 'Pozicija negali pasibaigti specialiu simboliu.';
  }
  if(startsWithSpecialSymbol(value as string)){
    return 'Pozicija negali prasidėti specialiu simboliu.';
  }
  const regex = /^([a-zA-Z]+(?:[ ,.!']{1,2}[a-zA-Z]+)*)$/i
  if (!regex.test(value as string)) {
    return 'Pozicija negali turėti specialių simbolių ar skaičių.';
  }
  
  return true
})

defineRule('phone', (value: String) =>{
  const phoneRegex = /^(\+?\d{1,3})?[-\s\(\)]*\d{1,4}[-\s\(\)]*\d{1,4}[-\s\(\)]*\d{1,4}$/;

  if (value && !phoneRegex.test(value as string)) {
    return 'Telefono numeris turi būti teisingas.';
  }
  if (value && value.length > 25){
    return 'Telefono numeris negali būti ilgesnis nei 25 skaičiai.'
  }
  return true
})

defineRule('companySelect', (value: String) =>{
  if(!value){
    return 'Kompanija negali būti tuščias laukas.'
}
  return true
})

defineRule('officeSelect', (value: String) =>{
  if(!value){
      return 'Ofisas negali būti tuščias laukas.'
  }
  return true
})

defineRule('divisionSelect', (value: String) =>{
  if(!value){
      return 'Padalinys negali būti tuščias laukas.'
  }
  return true
})

defineRule('departmentSelect', (value: String) =>{

  return true
})

defineRule('photo', (value: File) =>{

  if(value){
    if(value.size > 3145728){
      return 'Nuotraukos dydis negali viršyti: 3 mb dydžio.'
    }
  }
  return true
})

defineRule('groupSelect', (value: String) =>{

  return true
})

defineRule('password', (value: String) =>{
    if(!value){
        return 'Slaptažodis negali būti tuščias.'
    }
    if (value.length < 8) {
        return 'Slaptažodis turi būti bent 8 simbolių ilgumo.'
      }
    /*
      if (!/[a-z]/.test(value as string)) {
        return 'Slaptažodis turi turėti bent vieną mažają raidę.'
      }
    
      if (!/[A-Z]/.test(value as string)) {
        return 'Slaptažodis turi turėti bent vieną didžiają raidę.'
      }
    
      if (!/\d/.test(value as string)) {
        return 'Slaptažodis turi turėti bent vieną skaičių.'
      }
    
      if (!/[!@#$%^&*.{}',;]/.test(value as string)) {
        return 'Slaptažodis turi turėti bent vieną specialų simbolių (pvz. !@#$%^&*).'
      }*/
    return true
})