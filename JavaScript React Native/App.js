import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';

const HallOfFameScreen = ({ switchScreen, translate }) => (
  <View style={[styles.screenContainer, styles.additionalScreen]}>
    <Text style={styles.screenText}>Hall da Fama</Text>
     Érick Jacquin (Chef de cozinha francês-brasileiro
)
Henrique Fogaça  (Chef de cozinha e empresário)

Paola Carosella (Chef de cozinha e empresária
)
    <Button title={translate('backToHome')} onPress={() => switchScreen('Home')} />
  </View>
);

const NewsScreen = ({ switchScreen, translate }) => (
  <View style={[styles.screenContainer, styles.additionalScreen]}>
    <Text style={styles.screenText}>Novas Noticias de Receitas</Text>
    -Prato tradicional da culinária caxiense, bauru ao prato poderá se tornar patrimônio imaterial.
----------------------------------------------------------------------
    
    -Projeto resgata pela culinária recordações de refugiados - Agência de Notícias Brasil-Árabe.--------------------------------------------------------------------
    <Button title={translate('backToHome')} onPress={() => switchScreen('Home')} />
  </View>
);

const SupportScreen = ({ switchScreen, translate }) => (
  <View style={[styles.screenContainer, styles.additionalScreen]}>
    <Text style={styles.screenText}>Suporte</Text>
    Não hesite em entrar em contato com nosco; 
    <Text>Email de Suporte: victorodriguespace@gmail.com</Text>
    <Button title={translate('backToHome')} onPress={() => switchScreen('Home')} />
  </View>
);

const HomeScreen = ({ switchScreen, translate }) => (
  <View style={[styles.screenContainer, styles.homeScreen]}>
    <Text style={styles.screenText}>{translate('home')}</Text>
    <Button title={translate('settings')} onPress={() => switchScreen('Settings')} />
    <Button title={translate('recipes')} onPress={() => switchScreen('Recipes')} />
    <Button title={translate('shoppingList')} onPress={() => switchScreen('ShoppingList')} />
    <Button title={translate('dashboard')} onPress={() => switchScreen('Dashboard')} />
    <Button title="Hall da Fama" onPress={() => switchScreen('HallOfFame')} />
    <Button title="Novas Noticias" onPress={() => switchScreen('News')} />
    <Button title="Suporte" onPress={() => switchScreen('Support')} />
  </View>
);

const SettingsScreen = ({ switchScreen, translate, setLanguage }) => (
  <View style={[styles.screenContainer, styles.settingsScreen]}>
    <Text style={styles.screenText}>{translate('settings')}</Text>
    <Button title="Português" onPress={() => setLanguage('portuguese')} />
    <Button title="Inglês" onPress={() => setLanguage('english')} />
    <Button title="Espanhol" onPress={() => setLanguage('spanish')} />
    <Button title={translate('backToHome')} onPress={() => switchScreen('Home')} />
  </View>
);

const RecipesScreen = ({ recipes, setRecipes, switchScreen, translate }) => {
  const [newRecipeTitle, setNewRecipeTitle] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');

  const handleAddRecipe = () => {
    if (newRecipeTitle.trim() !== '' && newRecipeIngredients.trim() !== '') {
      const newRecipe = {
        title: newRecipeTitle,
        ingredients: newRecipeIngredients.split(',').map((ingredient) => ingredient.trim()),
      };
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
      setNewRecipeTitle('');
      setNewRecipeIngredients('');
    }
  };

  const handleRemoveRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <View style={[styles.screenContainer, styles.recipesScreen]}>
      <Text style={styles.screenText}>{translate('recipes')}</Text>

      <FlatList
        data={recipes}
        renderItem={({ item, index }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text>{translate('ingredients')}: {item.ingredients.join(', ')}</Text>
            <Button title={translate('remove')} onPress={() => handleRemoveRecipe(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TextInput
        style={styles.input}
        placeholder={translate('newRecipeTitle')}
        value={newRecipeTitle}
        onChangeText={setNewRecipeTitle}
      />
      <TextInput
        style={styles.input}
        placeholder={translate('newRecipeIngredients')}
        value={newRecipeIngredients}
        onChangeText={setNewRecipeIngredients}
      />
      <Button title={translate('addRecipe')} onPress={handleAddRecipe} />

      <Button title={translate('shoppingList')} onPress={() => switchScreen('ShoppingList')} />
      <Button title={translate('dashboard')} onPress={() => switchScreen('Dashboard')} />
    </View>
  );
};

const ShoppingListScreen = ({ switchScreen, translate }) => {
  const [listData, setListData] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setListData((prevList) => [...prevList, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...listData];
    updatedList.splice(index, 1);
    setListData(updatedList);
  };

  return (
    <View style={[styles.screenContainer, styles.additionalScreen]}>
      <Text style={styles.screenText}>{translate('shoppingList')}</Text>

      <FlatList
        data={listData}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
            <Button title={translate('remove')} onPress={() => handleRemoveItem(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TextInput
        style={styles.input}
        placeholder={translate('newItem')}
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title={translate('addItem')} onPress={handleAddItem} />

      <Button title={translate('backToHome')} onPress={() => switchScreen('Home')} />
      <Button title={translate('dashboard')} onPress={() => switchScreen('Dashboard')} />
    </View>
  );
};

const DashboardScreen = ({ recipes, switchScreen, translate }) => (
  <View style={[styles.screenContainer, styles.dashboardScreen]}>
    <Text style={styles.screenText}>{translate('dashboard')}</Text>
    <Text>{translate('recipeCount')}: {recipes.length}</Text>
    <Button title={translate('backToHome')} onPress={() => switchScreen('Home')} />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    marginBottom: 20,
  },
  loginScreen: {
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  homeScreen: {
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  settingsScreen: {
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  recipesScreen: {
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  additionalScreen: {
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  dashboardScreen: {
    backgroundColor: '#D8BFD8', // Roxo claro
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    padding: 8,
  },
  signUpText: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeItem: {
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
export default function App() {
  const [screen, setScreen] = useState('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [recipes, setRecipes] = useState([
    { title: 'Pasta Carbonara', ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese'] },
    { title: 'Chicken Stir-Fry', ingredients: ['Chicken Breast', 'Vegetables', 'Soy Sauce', 'Rice'] },
    { title: 'Chocolate Chip Cookies', ingredients: ['Flour', 'Butter', 'Sugar', 'Chocolate Chips'] },
  ]);

  const [language, setLanguage] = useState('portuguese');

  const switchScreen = (nextScreen) => {
    setScreen(nextScreen);
  };

  const translate = (key) => {
    const translations = {
      portuguese: {
        welcome: 'Bem-vindo',
        loginScreen: 'Tela de Login',
        signUpScreen: 'Tela de Cadastro',
        login: 'Login',
        signUp: 'Cadastrar',
        haveAccount: 'Já tem uma conta? Faça login.',
        noAccount: 'Não tem uma conta? Cadastre-se aqui.',
        home: 'Página Inicial',
        settings: 'Configurações',
        recipes: 'Receitas',
        shoppingList: 'Lista de Compras',
        dashboard: 'Dashboard',
        fillFields: 'Por favor, preencha ambos os campos para fazer login.',
        signupSuccess: 'Cadastro concluído com sucesso para',
        unknownScreen: 'Tela não reconhecida',
        newRecipeTitle: 'Título da Nova Receita',
        newRecipeIngredients: 'Ingredientes (separados por vírgula)',
        addRecipe: 'Adicionar Receita',
        ingredients: 'Ingredientes',
        remove: 'Remover',
        newItem: 'Novo Item',
        addItem: 'Adicionar Item',
        backToHome: 'Voltar para Tela Inicial',
        recipeCount: 'Quantidade de Receitas',
      },
      english: {
        welcome: 'Welcome',
        loginScreen: 'Login Screen',
        signUpScreen: 'Sign Up Screen',
        login: 'Login',
        signUp: 'Sign Up',
        haveAccount: 'Already have an account? Log in.',
        noAccount: 'Don\'t have an account? Sign up here.',
        home: 'Home',
        settings: 'Settings',
        recipes: 'Recipes',
        shoppingList: 'Shopping List',
        dashboard: 'Dashboard',
        fillFields: 'Please fill in both fields to log in.',
        signupSuccess: 'Sign up successful for',
        unknownScreen: 'Unknown Screen',
        newRecipeTitle: 'New Recipe Title',
        newRecipeIngredients: 'Ingredients (comma-separated)',
        addRecipe: 'Add Recipe',
        ingredients: 'Ingredients',
        remove: 'Remove',
        newItem: 'New Item',
        addItem: 'Add Item',
        backToHome: 'Back to Home',
        recipeCount: 'Recipe Count',
      },
      spanish: {
        welcome: 'Bienvenido',
        loginScreen: 'Pantalla de Inicio de Sesión',
        signUpScreen: 'Pantalla de Registro',
        login: 'Iniciar sesión',
        signUp: 'Registrarse',
        haveAccount: '¿Ya tienes una cuenta? Inicia sesión.',
        noAccount: '¿No tienes una cuenta? Regístrate aquí.',
        home: 'Página de Inicio',
        settings: 'Ajustes',
        recipes: 'Recetas',
        shoppingList: 'Lista de Compras',
        dashboard: 'Tablero',
        fillFields: 'Por favor, complete ambos los campos para iniciar sesión.',
        signupSuccess: 'Registro exitoso para',
        unknownScreen: 'Pantalla no reconocida',
        newRecipeTitle: 'Título de Nueva Receta',
        newRecipeIngredients: 'Ingredientes (separados por comas)',
        addRecipe: 'Agregar Receta',
        ingredients: 'Ingredientes',
        remove: 'Eliminar',
        newItem: 'Nuevo Artículo',
        addItem: 'Agregar Artículo',
        backToHome: 'Volver a la Página de Inicio',
        recipeCount: 'Cantidad de Recetas',
      },
    };
    return translations[language][key] || key;
  };

  const handleLogin = () => {
    if (username && password) {
      alert(`${translate('welcome')}, ${username}!`);
      switchScreen('Home');
    } else {
      alert(translate('fillFields'));
    }
  };

  const handleSignUp = () => {
    if (username && password) {
      alert(`${translate('signupSuccess')} ${username}!`);
      switchScreen('Home');
    } else {
      alert(translate('fillFields'));
    }
  };

  return (
    <View style={styles.container}>
      {screen === 'Login' ? (
        <View style={[styles.screenContainer, styles.loginScreen]}>
          <Text style={styles.screenText}>{isSigningUp ? translate('signUpScreen') : translate('loginScreen')}</Text>
          <TextInput
            style={styles.input}
            placeholder={translate('username')}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder={translate('password')}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button title={isSigningUp ? translate('signUp') : translate('login')} onPress={isSigningUp ? handleSignUp : handleLogin} />
          <Text style={styles.signUpText} onPress={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? translate('haveAccount') : translate('noAccount')}
          </Text>
        </View>
      ) : screen === 'Home' ? (
        <HomeScreen switchScreen={switchScreen} translate={translate} />
      ) : screen === 'Settings' ? (
        <SettingsScreen switchScreen={switchScreen} translate={translate} setLanguage={setLanguage} />
      ) : screen === 'Recipes' ? (
        <RecipesScreen recipes={recipes} setRecipes={setRecipes} switchScreen={switchScreen} translate={translate} />
      ) : screen === 'ShoppingList' ? (
        <ShoppingListScreen switchScreen={switchScreen} translate={translate} />
      ) : screen === 'Dashboard' ? (
        <DashboardScreen recipes={recipes} switchScreen={switchScreen} translate={translate} />
      ) : screen === 'HallOfFame' ? (
        <HallOfFameScreen switchScreen={switchScreen} translate={translate} />
      ) : screen === 'News' ? (
        <NewsScreen switchScreen={switchScreen} translate={translate} />
      ) : screen === 'Support' ? (
        <SupportScreen switchScreen={switchScreen} translate={translate} />
      ) : (
        <Text>{translate('unknownScreen')}</Text>
      )}
    </View>
  );
}