import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // States
  const [ingredients, setIngredients] = useState([
    { ingredient: null, type: null, gross: null, price: null },
  ]);

  const [storage, setStorage] = useState([]);
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [diets, setDiets] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedModifier, setSelectedModifier] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuId, setMenuId] = useState([]);
  const [menuSections, setMenuSections] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [imagePreviewURL, setImagePreviewURL] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [totalGrossWeight, setTotalGrossWeight] = useState(0);
  const [UOMs, setUOMs] = useState([]);
  const [allOptions, setAllOptions] = useState([
    {
      label: "Ingredients",
      options: [],
    },
    {
      label: "Preparations",
      options: [],
    },
  ]);
  const [deletingMethod, setDeletingMethod] = useState(null);
  const [clientDetails, setClientDetails] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    cd_client_id: "1",
    cd_brand_id: "1",
    cd_branch_id: "1",
    td_tax_category_id: null,
    deleting_method: "",
    totel_weight: 500,
    md_product_category_id: "2",
    md_station_id: "",
    md_allergy_id: "",
    md_diet_id: "",
    is_active: 1,
    product_name: "",
    maximun_day_of_product_return: "",
    cooking_time: "",
    description: "",
    gift: false,
    portion: false,
    bundle: false,
    not_allow_apply_discount: "",
    sold_by_weight: false,
    sale_price: "",
    barcode: "",
    product_image: null,
    product_price: "",
    created_by: "1",
    updated_by: "1",
    product_detail: [],
    product_modifiers: [],
  });

  // Utility Functions
  const formatData = (data, idKey, nameKey = "name") =>
    data.map((item) => ({
      label:
        item[nameKey] ||
        item.menu_name ||
        item.name ||
        item.diet_name ||
        item.station_name ||
        item.allergy_name,
      value: item[idKey],
    }));

  const updateProductDetail = (newProductDetail) => {
    setForm((prevForm) => ({
      ...prevForm,
      product_detail: newProductDetail,
    }));
  };

  const calculateCostPrice = (ing) => {
    const grossWeight = ing.grossWeight || 0; // Make sure to handle null or undefined
    const cost = ing.ingredient ? ing.ingredient.cost : 0; // Checking if ingredient exists

    const rowTotal = grossWeight * cost;
    return rowTotal;
  };

  const onSelectExistingModifier = (selectedModifier) => {
    if (selectedModifier && selectedModifier.value) {
      const existingModifierId = selectedModifier.value;
      updateProductModifiers(existingModifierId);
    }
  };

  const updateProductModifiers = (newModifierId) => {
    setForm((prevState) => {
      return {
        ...prevState,
        product_modifiers: [
          ...prevState.product_modifiers,
          { md_modifier_id: newModifierId },
        ],
      };
    });
  };

  // Fetch Functions
  const fetchClients = async () => {
      
    try {
      const res = await axiosInstance.get("/cdclients");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUom = async () => {
    try {
      const res = await axiosInstance.get("/uom");
      const formattedData = formatData(res.data.data.data, "md_uoms_id");
      setUOMs(formattedData);
      console.log("uom details", res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStorage = async () => {
    
    try {
      const res = await axiosInstance.get("/md_storage");
      console.log(res, "storageStorageishere");
      // const formattedData = formatData(res.data, "cd_client_id");
      setStorage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      const formattedData = formatData(
        res.data.product_category,
        "md_product_category_id",
        "product_category_name"
      );

      setCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaxCategories = async () => {
    console.log("is tax_category");
    try {
      const res = await axiosInstance.get("/tax_category");
      console.log(res, "tax_category");
      const formattedData = formatData(
        res.data.tax_category,
        "td_tax_category_id"
      );
      setTaxCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiets = async () => {
    try {
      const res = await axiosInstance.get("/diet");
      const formattedData = formatData(
        res.data.data,
        "md_diet_id",
        "diet_name"
      );
      setDiets(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllergies = async () => {
    try {
      const res = await axiosInstance.get("/allergy");
      const formattedData = formatData(res.data.data, "md_allergy_id");
      setAllergies(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await axiosInstance.get("/menu");
      const formattedData = formatData(res.data.data, "md_menu_id");

      setMenus(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStations = async () => {
    try {
      const res = await axiosInstance.get("/station");
      const formattedData = formatData(res.data.data, "md_station_id");
      setStations(formattedData);
      console.log(formattedData, "station");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenuSections = async () => {
      ;
    try {
      const res = await axiosInstance.get(`/menu_section/${menuId}`);
      const formattedData = formatData(res.data.data, "md_menu_section_id");
      setMenuSections(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axiosInstance.get("/ingredient");
      const ingredientOptions = response.data.data.map((item) => ({
        value: `ingredient_${item.md_ingredient_id}`, // Prefix with "ingredient_"
        label: item.name,
        type: "ingredient",
        cost: item.cost_price,
      }));
      setAllOptions((prevOptions) => [
        {
          ...prevOptions[0],
          options: [...ingredientOptions],
        },
        prevOptions[1],
      ]);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const fetchPreparations = async () => {
    try {
      const response = await axiosInstance.get("/preparation");
      const preparationOptions = response.data.data.map((item) => ({
        value: `preparation_${item.md_preparation_id}`, // Prefix with "preparation_"
        label: item.name,
        type: "preparation",
        cost: item.total_cost,
      }));
      setAllOptions((prevOptions) => [
        prevOptions[0],
        {
          ...prevOptions[1],
          options: [...preparationOptions],
        },
      ]);
    } catch (error) {
      console.error("Error fetching preparations:", error);
    }
  };

  const fetchModifiers = async () => {
    try {
      const res = await axiosInstance.get("/modifier");
      console.log(res, "modifier result");
      const formattedData = formatData(
        res.data.modifier.data,
        "md_modifier_id"
      );
      setModifiers([
        { value: "create_new_modifier", label: "Create New Modifier" },
        ...formattedData,
      ]); // Add default value + fetched values
    } catch (error) {
      console.log(error);
    }
  };
  const handleClientChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_client_id: e.target.value,
    }));
  };

  const handleBrandChange = (selectedIds) => {
    const brand_detail = selectedIds.map((value) => ({
      cd_brands: value,
    }));
    setBrandDetails((prevBrandDetails) => ({
      ...prevBrandDetails,
      cd_brand_id: brand_detail,
    }));
    setForm((prevForm) => ({
      ...prevForm,
      cd_brand_id: selectedIds,
      product_brand: brand_detail,
    }));
  };

  const handleBranchChange = (selectedIds) => {
      ;
    const branch_detail = selectedIds.map((value) => ({
      cd_branches: value,
    }));
    setBrandDetails((prevBrandDetails) => ({
      ...prevBrandDetails,
      cd_branch_id: branch_detail,
    }));
    setForm((prevForm) => ({
      ...prevForm,
      cd_branch_id: selectedIds,
      product_branch: branch_detail,
    }));
  };

  const handleCategoryChange = (selectedIds) => {
      ;
    const category_detail = selectedIds.map((value) => ({
      md_product_categories: value,
    }));
    setBrandDetails((prevBrandDetails) => ({
      ...prevBrandDetails,
      md_product_category_id: category_detail,
    }));
    setForm((prevForm) => ({
      ...prevForm,
      md_product_category_id: selectedIds,
      product_category: category_detail,
    }));
  };

  const handleDietsChange = (selectedIds) => {
    const diet_detail = selectedIds.map((value) => ({
      md_diets: value,
    }));

    setBrandDetails((prevBrandDetails) => ({
      ...prevBrandDetails,
      md_diet_id: diet_detail,
    }));

    setForm((prevForm) => ({
      ...prevForm,
      md_diet_id: selectedIds,
      product_diet: diet_detail,
    }));
  };

  const handleAllergyChange = (selectedIds) => {
    const allergy_detail = selectedIds.map((value) => ({
      md_allergies: value,
    }));

    setBrandDetails((prevBrandDetails) => ({
      ...prevBrandDetails,
      md_allergy_id: allergy_detail,
    }));
    setForm((prevForm) => ({
      ...prevForm,
      md_allergy_id: selectedIds,
      product_allergy: allergy_detail,
    }));
  };

  const handleMenuChange = (e) => {
    const id = parseInt(e.target.value);
    setMenuId(id);
    setForm((prevForm) => ({
      ...prevForm,
      md_menu_id: e.target.value,
    }));

    fetchMenuSections();
  };

  const handleMenuSectionChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_menu_section_id: e.target.value,
    }));
  };

  const handleStationChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_station_id: e.target.value,
    }));
  };

  const handleModifierChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_modifier_id: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "product_image") {
      let reader = new FileReader();

      reader.onloadend = () => {
        // Set the image preview URL
        setImagePreviewURL(reader.result);
      };

      if (files[0]) {
        reader.readAsDataURL(files[0]);
        setForm((prevForm) => ({
          ...prevForm,
          [name]: files[0],
        }));
      } else {
        // Reset the image preview URL if the file input is cleared
        setImagePreviewURL("");
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleTaxCategoryChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      td_tax_category_id: e.target.value,
    }));
  };

  const handleUomChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      md_uom_id: e.target.value,
    }));
  };


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Update state with 1 if checked and 0 if not checked
    setForm((prevState) => ({
      ...prevState,
      [name]: checked ? 1 : 0,
    }));
  };

  const handleDeletingMethodChange = (selectedOption) => {
    setForm((prevForm) => ({
      ...prevForm,
      deleting_method: selectedOption.value,
    }));
    setDeletingMethod(selectedOption);
  };

  const handleGrossWeightChange = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index].grossWeight = parseFloat(e.target.value) || 0;

    const newTotalGrossWeight = newIngredients.reduce((acc, curr) => {
      return acc + (curr.grossWeight || 0);
    }, 0);

    setIngredients(newIngredients);
    setTotalGrossWeight(newTotalGrossWeight);
  };

  const handleSelectChange = (newValue, index) => {
    // Deep cloning the ingredients array

    const newIngredients = JSON.parse(JSON.stringify(ingredients));

    // Updating the ingredient and type fields
    newIngredients[index].ingredient = newValue;
    newIngredients[index].type = newValue ? newValue.type : null;

    // Updating the state
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    console.log("ingredients submit", ingredients);
    const updatedIngredients = ingredients.map((item) => {
      if (item && item.ingredient && item.ingredient.value) {
        const originalValue = item.ingredient.value.replace(
          /^(ingredient_|preparation_)/,
          ""
        );

        return {
          ...item,
          ingredient: {
            ...item.ingredient,
            value: originalValue,
          },
        };
      }
      return item; // If it doesn't meet the criteria, return the original item
    });

    const product_detail = updatedIngredients.map((ing, index) => ({
      md_detail_id: ing.ingredient ? ing.ingredient.value : null,
      product_type: ing.type,
      gross: ing.grossWeight,
      cost: 1,
    }));

    const newForm = {
      ...form,
      product_detail: product_detail,
    };

    const formData = new FormData();
    Object.keys(newForm).forEach((key) => {
      if (Array.isArray(newForm[key])) {
        formData.append(key, JSON.stringify(newForm[key]));
      } else {
        formData.append(key, newForm[key] || "");
      }
    });

    // formData.append("product_detail", JSON.stringify(product_detail));

    console.log(form, "form");
    // Log the contents of 'formData' for debugging
    for (const [key, value] of formData.entries()) {
      console.log(`FormData Entry - ${key}: ${value}`);
    }

    // console.log(product_detail, "details");

    updateProductDetail(product_detail);
    const filteredObject = { ...form };
    delete filteredObject.md_product_category_id;
    delete filteredObject.md_allergy_id;
    delete filteredObject.cd_brand_id;
    delete filteredObject.cd_branch_id;
    delete filteredObject.md_diet_id;
    delete filteredObject.md_product_category_id;
    // delete filteredObject.cd_client_id;
    // filteredObject.cd_client_id = 1;
    console.log(filteredObject);
      ;
    if (editProductId !== null) {
      try {
        await axiosInstance.post(
          `/product_update/${editProductId}`,
          filteredObject,
          {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
          }
        );
        toast.success("Product updated successfully", {
          autoClose: true,
        });

        // Reset the form here
        // setForm({
        //   cd_client_id: "1",
        //   cd_brand_id: "1",
        //   cd_branch_id: "1",
        //   td_tax_category_id: null,
        //   deleting_method: "test",
        //   totel_weight: 500,
        //   md_product_category_id: "2",
        //   //   md_station_id: "",
        //   md_allergy_id: "",
        //   md_diet_id: "",
        //   is_active: 1,
        //   product_name: "",
        //   maximun_day_of_product_return: "",
        //   cooking_time: "",
        //   description: "",
        //   gift: false,
        //   portion: false,
        //   bundle: false,
        //   not_allow_apply_discount: "",
        //   sold_by_weight: false,
        //   sale_price: "",
        //   barcode: "",
        //   product_image: null,
        //   product_price: "",
        //   created_by: "1",
        //   updated_by: "1",
        //   product_detail: [],
        // });
      } catch (error) {
        console.log(error, "Error updating product");
      }
    } else {
      try {
        const response = await axiosInstance.post(
          "/product_store",
          filteredObject,
          {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
          }
        );

        toast.success("Product created successfully", {
          autoClose: true,
        });

        // Reset the form here
        setForm({
          cd_client_id: "1",
          cd_brand_id: "1",
          cd_branch_id: "1",
          td_tax_category_id: null,
          deleting_method: "test",
          totel_weight: 500,
          md_product_category_id: "2",
          //   md_station_id: "",
          md_allergy_id: "",
          md_diet_id: "",
          is_active: 1,
          product_name: "",
          maximun_day_of_product_return: "",
          cooking_time: "",
          description: "",
          gift: false,
          portion: false,
          bundle: false,
          not_allow_apply_discount: "",
          sold_by_weight: false,
          sale_price: "",
          barcode: "",
          product_image: null,
          product_price: "",
          created_by: "1",
          updated_by: "1",
          product_detail: [],
        });
      } catch (error) {
        toast.error("Error creating product", {
          autoClose: true,
        });
      }
    }
  };

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    fetchUom();
    fetchClients();
    fetchStorage();
    fetchBrands();
    fetchBranches();
    fetchCategories();
    fetchTaxCategories();
    fetchDiets();
    fetchAllergies();
    fetchMenus();
    fetchStations();
    fetchIngredients();
    fetchPreparations();
    fetchModifiers();
   
    // if (location.state?.id) {
    //   setEditProductId(location.state?.id);
    // }
    // fetchProductData();
  }, []);

  useEffect(() => {
    if (isLoading) {
      Promise.all([fetchIngredients(), fetchPreparations()]).then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <ProductContext.Provider
      value={{
        // State
        clients,
        storage,
        brands,
        branches,
        categories,
        taxCategories,
        diets,
        allergies,
        stations,
        menus,
        menuId,
        menuSections,
        imagePreviewURL,
        editProductId,
        ingredients,
        totalGrossWeight,
        deletingMethod,
        isLoading,
        allOptions,
        modifiers,
        selectedModifier,
        UOMs,
        form,
        // Setters
        setForm,
        setClients,
        setBrands,
        setBranches,
        setCategories,
        setTaxCategories,
        setSelectedModifier,
        setDiets,
        setAllergies,
        setStations,
        setModifiers,
        setMenus,
        setMenuId,
        setMenuSections,
        setImagePreviewURL,
        setEditProductId,
        setIngredients,
        setTotalGrossWeight,
        setAllOptions,
        setDeletingMethod,
        setIsLoading,
        setForm,
        setStorage,

        // Handlers
        handleClientChange,
        handleBrandChange,
        handleBranchChange,
        handleCategoryChange,
        handleDietsChange,
        handleAllergyChange,
        handleMenuChange,
        handleMenuSectionChange,
        handleStationChange,
        handleModifierChange,
        handleChange,
        handleTaxCategoryChange,
        handleTaxCategoryChange,
        handleCheckboxChange,
        handleDeletingMethodChange,
        handleSelectChange,
        handleSubmit,
        handleGrossWeightChange,
        handleUomChange,
        //Functions
        updateProductDetail,
        calculateCostPrice,
        onSelectExistingModifier,
        updateProductModifiers,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for accessing the context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
