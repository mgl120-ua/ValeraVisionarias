import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NuevaPropiedadPage() {
  return (
    <Card className="border-2 border-stone-200">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-light">Nueva Propiedad</CardTitle>
      </CardHeader>
      <CardContent>
        <PropertyForm />
      </CardContent>
    </Card>
  );
}
