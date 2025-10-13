"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export default function Doacoes() {
  const [copied, setCopied] = useState(false);
  const pixKey = "perpertuosocorroaltiplano@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-wide font-serif">
            DOAÇÕES
          </h1>
          <p className="text-base md:text-lg text-white/90 font-sans max-w-2xl mx-auto leading-relaxed">
            Sua doação é fundamental para manter nossas atividades pastorais e comunitárias.
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl md:text-2xl font-bold text-white font-serif">
              Contribua via PIX
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* PIX Key Section */}
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-xs text-white/70 mb-2 font-medium uppercase tracking-wide">
                  Chave PIX (E-mail)
                </p>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <div className="flex-1 bg-white/10 rounded-lg px-4 py-3 border border-white/20">
                    <p className="text-white font-mono text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {pixKey}
                    </p>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="bg-secondary hover:bg-secondary/90 text-white border-secondary hover:border-secondary/90 transition-all duration-200 flex-shrink-0"
                    size="lg"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className="text-white/70 font-sans text-sm">
            Que Deus abençoe sua generosidade e a sua família! 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
