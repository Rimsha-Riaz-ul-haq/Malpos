import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Documentation, ChangeLog, Error } from "./pages/supports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatars,
  Alerts,
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import {
  Ecommerce,
  Analytics,
  CRM,
  ForgotPassword,
  Register,
  Login,
  UserList,
  UserProfile,
  MyAccount,
  ProductList,
  ProductView,
  ProductUpload,
  InvoiceList,
  InvoiceDetails,
  OrderList,
  Message,
  Notification,
  BlankPage,
  Settings,
} from "./pages/master";
import AuthProvider from "./context/Auth";
import Preparation from "./pages/master/Preparation";
import Ingredients from "./pages/master/Ingredients";
import IngredientsDetails from "./components/Tabs/IngredientsDetails";
import Categories from "./pages/master/Categories";
import Station from "./pages/master/Station";

import PreparationView from "./pages/master/PreparationView";

import Rearrangement from "./pages/master/Rearrangement";
import Constructure from "./pages/master/Constructure";
import ConstructureEdit from "./pages/master/ConstructureEdit";
import ConstructureProduct from "./pages/master/ConstructureProduct";
import ConstructureDish from "./pages/master/ConstrucureDish";
import ManageModifier from "./pages/master/ManageModifier";
import ManageModifierEdit from "./pages/master/ManageModifierEdit";
import ManageModifierDuplicate from "./pages/master/ManageModifierDuplicate";
import Receipt from "./pages/master/Receipt";
import ReceiptEdit from "./pages/master/ReceiptEdit";
import OfferNotifications from "./pages/master/OffterNotifications";
import ProductReturn from "./pages/master/ProductReturn";
import ProductReturnSIngleReceipt from "./pages/master/ProductReturnSIngleReceipt";
import ReturnProductTaxes from "./pages/master/ReturnProductTaxes";
import ManageModifierSingle from "./pages/master/ManageModifierSingle";

import ModiferProduct from "./pages/master/ModifierProduct";

import SalePaymentMethod from "./pages/master/SalePaymentMethod";
import PaymentMethodCreate from "./pages/master/PaymentMethodCreate";
import SaleType from "./pages/master/SaleType";
import Accounts from "./data/master/BankCashAccount";

import SaleTypeCreate from "./pages/master/SaleTypeCreate";
import Stocks from "./pages/master/Stock";
import MovementReport from "./pages/master/MovementReport";
import ProductMovement from "./pages/master/ProductMovement";

import AccountCreate from "./data/master/BankCashaccountCreate";
import AccountsDetails from "./pages/master/AccountsDetails";
import AccCategories from "./pages/master/AccCategories";
import AccountCatgories from "./data/master/ChartofAccounts";
import AccountsEdit from "./data/master/BankCashAccountEdit";
import Payroll from "./data/master/Payrolls";
import Cashflow from "./data/master/Cashflows";
import Transactions from "./data/master/FinancialTransactions";
import TransactionCashflow from "./data/master/FinancialTransactionCashflow";
import ReturnSupplies from "./pages/master/ReturnSupplies";
import ReturnSuppliesDetails from "./pages/master/ReturnSuppliesDetails";
import Transfers from "./pages/master/Transfers";
import InventoryCheck from "./pages/master/InventoryCheck";
import Packages from "./pages/master/Packages";
import Storage from "./pages/master/Storage";
import StorageEdit from "./pages/master/StorageEdit";
import StorageCreate from "./pages/master/StorageCreate";
import StorageDetails from "./pages/master/StorageDetails";
import Suppliers from "./pages/master/Suppliers";
import SuppliersCreate from "./pages/master/SuppliersCreate";

import Production from "./pages/master/Production";
import ProductionDetails from "./pages/master/ProductionDetails";

import StockDetails from "./pages/master/StockDetails";
import StockDetailsSupplies from "./pages/master/StockDetailsSupplies";
import SuppliesCreate from "./pages/master/SuppliesCreate";
import ReturnSuppliesCreate from "./pages/master/ReturnSuppliesCreate";
import SuppliesEdit from "./pages/master/SuppliesEdit";

import TransferDetails from "./pages/master/TransferDetails";
import TransferCreate from "./pages/master/TransferCreate";
import ButtonComponent from "./pages/master/InventoryCreate";
import Steps from "./pages/master/InventoryCreate";
import InventoryCreate from "./pages/master/InventoryCreate";
import AddProductInventory from "./pages/master/AddProductInventory";

import CategoriesCreate from "./data/master/ChartofAccountCreate";
import CreateTransaction from "./data/master/CreateFinancialTransaction";
import PayrolTransactions from "./pages/master/PayrolTransaction";

import EmenuSetting from "./pages/master/EmenuSetting";
import MCustomerDetails from "./pages/master/MCustomerDetails";
import MCustomerCreate from "./pages/master/MCustomerCreate";
import EmenuCategories from "./pages/master/EmenuCategories";
import EmenuCategoriesCreate from "./pages/master/EmenuCategoriesCreate";

import CustomerGroup from "./pages/master/CustomerGroup";
import Customer from "./pages/master/Customer";
import Reviews from "./pages/master/Review";
import EmenuList from "./pages/master/EmenuList";
import SuppliersDetails from "./pages/master/SuppliersDetails";
import SuppliersDetailsSupplies from "./pages/master/SuppliersDetailsSupplies";
import PackagesCreate from "./pages/master/PackagesCreate";
import Supplies from "./pages/master/Supplies";

import Product from "./components/newComponents/Product/Product";
import ProductCategory from "./components/newComponents/ProductCategory/ProductCategory";
import ProductGroups from "./components/newComponents/ProductGroups/ProductGroups";
import CreateProduct from "./pages/form/CreateProduct";
import UpdateModifiersDetails from "./components/createProduct/UpdateModifiersDetails";
import CreateProductCategory from "./pages/form/CreateProductCategory";
import CreateProductGroup from "./pages/form/CreateProductGroup";
import TaxCategory from "./components/newComponents/TaxCategory/TaxCategory";
import TaxRate from "./components/newComponents/TaxRate/TaxRate";
import Brands from "./newPages/Brands/Brands";
import Branches from "./newPages/Branches/Branches";
import CreateBranch from "./newPages/Branches/CreateBranch";
import CreateBrand from "./newPages/Brands/CreateBrand";
import RequireAuth from "./guard/RequireAuth";
import CreateTaxCategory from "./components/newComponents/TaxCategory/CreateTaxCategory";
import CreateTaxRate from "./components/newComponents/TaxRate/CreateTaxRate";
import Reports from "./components/newComponents/FilterReports/Reports";
import Banks from "./newPages/Banks/Banks";
import CreateBank from "./newPages/Banks/CreateBank";
import BankAccounts from "./newPages/BankAccounts/BankAccounts";
import CreateBankAccount from "./newPages/BankAccounts/CreateBankAccount";
import ClientRoles from "./components/newComponents/ClientRoles/ClientRoles";
import CreateClientRoles from "./components/newComponents/ClientRoles/CreateClientRoles";
import CreateStation from "./pages/form/CreateStation";
import CreateMenus from "./pages/form/CreateMenus";
import CreateMenuModifier from "./pages/form/CreateMenuModifier";
import Allergies from "./newPages/Allergies/Allergies";
import Diets from "./newPages/Diets/Diets";
import CreateDiet from "./newPages/Diets/CreateDiet";
import CreateAllergie from "./newPages/Allergies/CreateAllergie";
import CreateIngredient from "./pages/form/CreateIngredient";
import CreateIngredientCategory from "./pages/form/CreateIngredientCategory";
import CreatePreparation from "./pages/form/CreatePreparation";
import Menus from "./newPages/Menus/Menus";
import CreateMenu from "./pages/form/CreateMenu";
import MenuSections from "./newPages/MenuSections/MenuSection";
import CreateMenuSection from "./newPages/MenuSections/CreateMenuSection";
import CreateModifer from "./pages/form/CreateModifer";

import { ProductProvider } from "./components/createProduct/productContext";
import SuppliersEdit from "./pages/master/SuppliersEdit";
import AccountCategoryedit from "./data/master/ChatofAccountEdit";
import Unitmeasurement from "./pages/master/Unitmeasurement";
import UnitCreate from "./pages/master/unitCreate";

export default function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer />
          <LoaderProvider>
            <BrowserRouter>
              <Routes>
                {/* master Pages */}
                {/* <Route path="/ecommerce" element={<Ecommerce />} /> */}
                <Route path="/ecommerce" element={<Analytics />} />
                <Route
                  path="/analytics"
                  element={
                    <RequireAuth>
                      <Analytics />
                    </RequireAuth>
                  }
                />
                <Route path="/crm" element={<CRM />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/product-list" element={<ProductList />} />
                <Route path="/product-view" element={<ProductView />} />
                {/* <Route path="/product-view/:id" element={<ProductView />} /> */}
                <Route path="/preparation-view" element={<PreparationView />} />
                <Route path="/product-upload" element={<ProductUpload />} />
                <Route path="/invoice-list" element={<InvoiceList />} />
                <Route path="/invoice-details" element={<InvoiceDetails />} />
                <Route path="/order-list" element={<OrderList />} />
                <Route path="/message" element={<Message />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/blank-page" element={<BlankPage />} />
                <Route path="/return-create" element={<ReturnSuppliesCreate/>}/>
                <Route path="/category-edit" element={<AccountCategoryedit/>}/>
                {/* Blocks Pages */}
                {/* <Route path="/headings" element={<Headings />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/alerts" element={<Alerts />} /> */}
                {/* Custom Pages */}

                <Route
                  path="/product-groups"
                  element={
                    <RequireAuth>
                      <ProductGroups />
                    </RequireAuth>
                  }
                />
                <Route
                  path="report"
                  element={
                    <RequireAuth>
                      <Reports />
                    </RequireAuth>
                  }
                />
                <Route
                  path="banks"
                  element={
                    <RequireAuth>
                      <Banks />
                    </RequireAuth>
                  }
                />
                <Route
                  path="create-bank"
                  element={
                    <RequireAuth>
                      <CreateBank />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/bank-account"
                  element={
                    <RequireAuth>
                      <BankAccounts />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-bank-account"
                  element={
                    <RequireAuth>
                      <CreateBankAccount />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/client-roles"
                  element={
                    <RequireAuth>
                      <ClientRoles />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-client-role"
                  element={
                    <RequireAuth>
                      <CreateClientRoles />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-station"
                  element={
                    <RequireAuth>
                      <CreateStation />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-ingredient-category"
                  element={
                    <RequireAuth>
                      <CreateIngredientCategory />
                    </RequireAuth>
                  }
                />
                {/* <Route
                path="/create-menus"
                element={
                  <RequireAuth>
                    <CreateMenus />
                  </RequireAuth>
                }
              /> */}
                <Route
                  path="/create-menu-modifier"
                  element={
                    <RequireAuth>
                      <CreateMenuModifier />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/allergies"
                  element={
                    <RequireAuth>
                      <Allergies />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-allergie"
                  element={
                    <RequireAuth>
                      <CreateAllergie />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/diets"
                  element={
                    <RequireAuth>
                      <Diets />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-diet"
                  element={
                    <RequireAuth>
                      <CreateDiet />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/menus"
                  element={
                    <RequireAuth>
                      <Menus />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-menu"
                  element={
                    <RequireAuth>
                      <CreateMenu />
                    </RequireAuth>
                  }
                />
                <Route path="/preparation" element={<Preparation />} />
                <Route
                  path="/create-preparation"
                  element={
                    <RequireAuth>
                      <CreatePreparation />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/menu-section"
                  element={
                    <RequireAuth>
                      <MenuSections />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-menu-section"
                  element={
                    <RequireAuth>
                      <CreateMenuSection />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-modifer"
                  element={
                    <RequireAuth>
                      <CreateModifer />
                    </RequireAuth>
                  }
                />

                <Route path="/ingredient" element={<Ingredients />} />
                <Route
                  path="/create-ingredient"
                  element={<CreateIngredient />}
                />
                <Route path="/ingredient" element={<Ingredients />} />
                <Route
                  path="/create-ingredient"
                  element={<CreateIngredient />}
                />

                <Route
                  path="/ingredient-details"
                  element={<IngredientsDetails />}
                />

                <Route path="/categories" element={<Categories />} />
                <Route path="/station" element={<Station />} />
                {/* fix donr */}
                <Route path="/rearrangement" element={<Rearrangement />} />
                <Route path="/constructure" element={<Constructure />} />
                {/* constructure edit page */}
                <Route
                  path="/constructure-edit"
                  element={<ConstructureEdit />}
                />
                {/* constructure page edit option having first option product, page product here it is ..  */}

                <Route
                  path="/constructure-product"
                  element={<ConstructureProduct />}
                />
                {/* constructure page edit option having secound option dish, here it is the dish page .. */}
                <Route
                  path="/constructure-dish"
                  element={<ConstructureDish />}
                />

                {/* modifier page  */}
                <Route path="/manage-modifier" element={<ManageModifier />} />
                {/* page for edit when user click on edit  */}
                <Route
                  path="/modifier-update"
                  element={<UpdateModifiersDetails />}
                />
                {/* page for duplicta when user click on duplicta  */}
                <Route
                  path="/manage-modifier-duplicate"
                  element={<ManageModifierDuplicate />}
                />
                <Route
                  path="/manage-modifier-product"
                  element={<ManageModifierSingle />}
                />
                <Route path="/modifier-product" element={<ModiferProduct />} />
                {/* receipt ffix bugs*/}
                <Route path="/receipt" element={<Receipt />} />
                <Route path="/receipt-edit" element={<ReceiptEdit />} />
                <Route
                  path="/sale-product-return"
                  element={<ProductReturnSIngleReceipt />}
                />
                <Route
                  path="/product-return-taxes"
                  element={<ReturnProductTaxes />}
                />
                {/* order notification page */}
                <Route
                  path="/order-notification"
                  element={<OfferNotifications />}
                />
                <Route path="/product-return" element={<ProductReturn />} />

                <Route path="/payment-method" element={<SalePaymentMethod />} />
                <Route path="/sale-type" element={<SaleType />} />

                <Route
                  path="/payment-method-create"
                  element={<PaymentMethodCreate />}
                />
                <Route path="/unit-measurement" element={<Unitmeasurement/>}/>
                <Route path="/saleType-create" element={<SaleTypeCreate />} />

                <Route path="/accounts" element={<Accounts />} />
                {/* Inventory section */}
                <Route path="/stocks" element={<Stocks />} />
                {/* stock details sk 3-31 */}
                <Route path="/stocks-details" element={<StockDetails />} />
                <Route
                  path="/stocks-supplies"
                  element={<StockDetailsSupplies />}
                />
                <Route path="/supplies-create" element={<SuppliesCreate />} />
                <Route path="/supplies-edit" element={<SuppliesEdit />} />
                <Route path="/movement-reports" element={<MovementReport />} />
                <Route path="/product-movement" element={<ProductMovement />} />

                {/* finance section */}

                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts-create" element={<AccountCreate />} />
                <Route path="/accounts-edit" element={<AccountsEdit />} />
                <Route path="/accounts-details" element={<AccountsDetails />} />
                {/* <Route path="/acc-categories" element={<AccCategoriesas />} /> */}
                <Route
                  path="/account-categories"
                  element={<AccountCatgories />}
                />
                <Route path="/payroll" element={<Payroll/>} />
                <Route path="/cashflow" element={<Cashflow />} />
                <Route
                  path="/payroll-transactions"
                  element={<Transactions />}
                />
                <Route
                  path="/cashflow-transactions"
                  element={<TransactionCashflow />}
                />
                <Route path="/supplies" element={<Supplies />} />

                <Route path="/return-supplies" element={<ReturnSupplies />} />
                <Route
                  path="/return-supplies-details"
                  element={<ReturnSuppliesDetails />}
                />
                <Route
                  path="/return-supplies-create"
                  element={<ReturnSuppliesCreate />}
                />
                <Route path="/transfers" element={<Transfers />} />
                <Route
                  path="/transfers-details"
                  element={<TransferDetails />}
                />
                <Route path="/transfers-create" element={<TransferCreate />} />
                <Route path="/inventory-check" element={<InventoryCheck />} />
                <Route path="/inventory-create" element={<InventoryCreate />} />
                <Route
                  path="/inventory-add-product"
                  element={<AddProductInventory />}
                />
                <Route path="/packages" element={<Packages />} />
                {/* today sk */}
                <Route path="/storage" element={<Storage />} />
                <Route path="/storage-edit" element={<StorageEdit />} />
                <Route path="/storage-create" element={<StorageCreate />} />
                <Route path="/storage-details" element={<StorageDetails />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers-create" element={<SuppliersCreate />} />
                <Route path="/suppliers-edit" element={<SuppliersEdit />} />
                {/* Alert  /suppliers-create and /suppliers-edit having same design  */}
                <Route path="/production" element={<Production />} />
                <Route
                  path="/production-details"
                  element={<ProductionDetails />}
                />

                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts-create" element={<AccountCreate />} />
                <Route path="/accounts-edit" element={<AccountsEdit />} />
                <Route path="/accounts-details" element={<AccountsDetails />} />
                {/* <Route path="/acc-categories" element={<AccCategoriesas />} /> */}
                <Route
                  path="/account-categories"
                  element={<AccountCatgories />}
                />
                <Route
                  path="/categories-create"
                  element={<CategoriesCreate />}
                />
                <Route path="/transactions" element={<Transactions />} />
                <Route
                  path="/createTransaction"
                  element={<CreateTransaction />}
                />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/cashflow" element={<Cashflow />} />
                <Route
                  path="/payroll-transactions"
                  element={<PayrolTransactions />}
                />
                <Route
                  path="/cashflow-transactions"
                  element={<TransactionCashflow />}
                />

                <Route path="/return-supplies" element={<ReturnSupplies />} />
                <Route
                  path="/return-supplies-details"
                  element={<ReturnSuppliesDetails />}
                />
                <Route
                  path="/return-supplies-cteate"
                  element={<ReturnSuppliesCreate />}
                />
                <Route path="/transfers" element={<Transfers />} />
                <Route path="/inventory-check" element={<InventoryCheck />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages-create" element={<PackagesCreate />} />
                {/* today sk */}
                <Route path="/storage" element={<Storage />} />
                <Route path="/storage-edit" element={<StorageEdit />} />
                <Route path="/storage-create" element={<StorageCreate />} />
                <Route path="/storage-details" element={<StorageDetails />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/suppliers-create" element={<SuppliersCreate />} />
                <Route path="/suppliers-edit" element={<SuppliersEdit />} />
                <Route path="/units-create" element={<UnitCreate/>}/>
                <Route
                  path="/suppliers-details"
                  element={<SuppliersDetails />}
                />
                <Route
                  path="/suppliers-details-supplies"
                  element={<SuppliersDetailsSupplies />}
                />

                {/* Alert  /suppliers-create and /suppliers-edit having same design  */}
                <Route path="/production" element={<Production />} />
                <Route
                  path="/production-details"
                  element={<ProductionDetails />}
                />
                {/* sk 4-4-23 start */}
                {/* emenu */}
                <Route
                  path="/emenu-categories"
                  element={
                    <RequireAuth>
                      <EmenuCategories />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/emenu-categories-create"
                  element={
                    <RequireAuth>
                      <EmenuCategoriesCreate />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/emenu-setting"
                  element={
                    <RequireAuth>
                      <EmenuSetting />
                    </RequireAuth>
                  }
                />
                {/* marketing  */}
                <Route
                  path="/marketing-customer-details"
                  element={
                    <RequireAuth>
                      <MCustomerDetails />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/customer-create"
                  element={
                    <RequireAuth>
                      <MCustomerCreate />
                    </RequireAuth>
                  }
                />
                {/* sk 4-4-23 end */}

                {/* Marketing pages */}
                <Route
                  path="/customer"
                  element={
                    <RequireAuth>
                      <Customer />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/customer-group"
                  element={
                    <RequireAuth>
                      <CustomerGroup />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/review"
                  element={
                    <RequireAuth>
                      <Reviews />
                    </RequireAuth>
                  }
                />
                {/* eMenu pages */}
                <Route
                  path="/eMenu-list"
                  element={
                    <RequireAuth>
                      <EmenuList />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/eMenu-rearrangement"
                  element={
                    <RequireAuth>
                      <Rearrangement />
                    </RequireAuth>
                  }
                />

                {/* Supports Pages */}
                <Route path="*" element={<Error />} />
                {/* <Route path="/" element={<Analytics />} /> */}
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/changelog" element={<ChangeLog />} />

                {/* New Routes  */}

                <Route path="/product-page" element={<Product />} />
                <Route
                  path="/product-category"
                  element={
                    <RequireAuth>
                      <ProductCategory />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-product"
                  element={
                    <RequireAuth>
                      <CreateProduct />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-category"
                  element={
                    <RequireAuth>
                      <CreateProductCategory />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-group"
                  element={
                    <RequireAuth>
                      <CreateProductGroup />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/tax-category"
                  element={
                    <RequireAuth>
                      <TaxCategory />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-tax-category"
                  element={
                    <RequireAuth>
                      <CreateTaxCategory />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/tax-rate"
                  element={
                    <RequireAuth>
                      <TaxRate />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-tax-rate"
                  element={
                    <RequireAuth>
                      <CreateTaxRate />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/brands"
                  element={
                    <RequireAuth>
                      <Brands />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/branches"
                  element={
                    <RequireAuth>
                      <Branches />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-branch"
                  element={
                    <RequireAuth>
                      <CreateBranch />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/create-brand"
                  element={
                    <RequireAuth>
                      <CreateBrand />
                    </RequireAuth>
                  }
                />
              </Routes>
            </BrowserRouter>
          </LoaderProvider>
        </ThemeProvider>
      </AuthProvider>
    </ProductProvider>
  );
}
