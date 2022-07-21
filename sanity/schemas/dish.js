export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Dish name",
      validation: (Rule) => Rule.required()
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "price",
      type: "string",
      title: "Price of the Dish"
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Dish"
    }
  ]
};
