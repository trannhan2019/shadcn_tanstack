import "./assets/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("Input", Input);
app.component("Label", Label);
app.component("Button", Button);
app.component("Badge", Badge);
app.component("Card", Card);
app.component("CardContent", CardContent);
app.component("CardDescription", CardDescription);
app.component("CardHeader", CardHeader);
app.component("CardTitle", CardTitle);
app.component("DropdownMenu", DropdownMenu);
app.component("DropdownMenuContent", DropdownMenuContent);
app.component("DropdownMenuItem", DropdownMenuItem);
app.component("DropdownMenuLabel", DropdownMenuLabel);
app.component("DropdownMenuSeparator", DropdownMenuSeparator);
app.component("DropdownMenuTrigger", DropdownMenuTrigger);
app.component("Sheet", Sheet);
app.component("SheetContent", SheetContent);
app.component("SheetTrigger", SheetTrigger);

app.mount("#app");
