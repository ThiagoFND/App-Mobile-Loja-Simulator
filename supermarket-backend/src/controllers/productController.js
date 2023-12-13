const productModel = require('../models/productModel'); // Certifique-se de que está usando o nome correto do modelo
const UserModel = require('../models/userModel');

const productController = {
  search: async (req, res) => {
    try {
      const result = await productModel.find({});
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, code, image, price, descricao } = req.body;

      // Verifique se todos os campos necessários estão presentes
      if (!nome || !code || !image || !price || !descricao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Crie um novo produto usando o modelo
      const newProduct = new productModel({
        nome,
        code,
        image,
        descricao,
        price,
      });

      // Salve o novo produto no banco de dados
      await newProduct.save();

      res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
    } catch (error) {
      console.error('Erro ao criar um produto:', error);
      res.status(500).json({ error: 'Erro ao criar um produto' });
    }
  },

  searchOne: async (req, res) => {
    try {
      const result = await productModel.findOne({ code: req.params.code }); // Corrigir para usar req.params.code
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao buscar um produto:', error);
      res.status(500).json({ error: 'Erro ao buscar um produto' });
    }
  },

  changeAvatar: async (req, res) => {
    try {
      const result = await productModel.change(req, res); // Certifique-se de que sua função de modelo está correta
      res.status(201).json(result);
    } catch (error) {
      console.error('Erro ao alterar o avatar:', error);
      res.status(500).json({ error: 'Erro ao alterar o avatar' });
    }
  },

  updateCart: async (req, res) => {
    try {
      const { cartItems } = req.body;
      
      // Supondo que você tenha um modelo de usuário com uma propriedade 'cart'
      const user = await UserModel.findOne({ /* critérios de busca do usuário */ });
  
      if (!user) {
        // Se o usuário não for encontrado, você pode optar por criar um novo usuário ou lidar de acordo com a lógica do seu aplicativo
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Atualize o carrinho do usuário com os novos itens
      user.cart = cartItems;
  
      // Salve as alterações no banco de dados
      await user.save();
  
      // Responda com sucesso e os itens atualizados
      res.status(200).json({ message: 'Carrinho atualizado com sucesso', updatedCart: cartItems });
    } catch (error) {
      console.error('Erro ao atualizar o carrinho:', error);
      res.status(500).json({ error: 'Erro ao atualizar o carrinho' });
    }
  },
  
};

module.exports = productController;
