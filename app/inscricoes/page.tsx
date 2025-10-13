import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Inscricoes() {
  return (
    <div className="h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide font-serif">
            INSCRIÇÕES
          </h1>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">          
          <CardContent className="text-center space-y-6">
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Não temos inscrições abertas no momento.
            </p>

            {/* Action Button */}
            <div className="pt-2">
              <Button
                variant="outline"
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white border-secondary hover:border-secondary/90 transition-all duration-200"
                size="lg"
              >
                <Link href="/" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Ver Programação Semanal
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
