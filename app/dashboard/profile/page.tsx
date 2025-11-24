"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useAuthStore } from "@/store/useAuthStore";
import {
  updateProfile,
  deleteAccount,
  updatePlan,
  cancelSubscription,
  AVAILABLE_PLANS,
} from "@/services/authService";
import {
  User,
  Trash2,
  Save,
  AlertTriangle,
  CreditCard,
  XCircle,
  Check,
} from "lucide-react";

/**
 * Página de perfil do usuário
 * Permite editar informações e deletar conta
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, refreshUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    // Validações
    if (!formData.name.trim()) {
      setError("O nome é obrigatório");
      return;
    }

    if (!formData.email.trim()) {
      setError("O e-mail é obrigatório");
      return;
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        setError("A nova senha deve ter pelo menos 6 caracteres");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }
    }

    setIsSaving(true);

    try {
      const updateData: {
        name?: string;
        email?: string;
        password?: string;
      } = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      await updateProfile(updateData);
      await refreshUser();
      setSuccess("Perfil atualizado com sucesso!");
      setIsEditing(false);

      // Limpar campos de senha
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar perfil. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await deleteAccount();
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao deletar conta. Tente novamente.";
      setError(errorMessage);
      setIsDeleting(false);
    }
  };

  const handleUpdatePlan = async (planId: string) => {
    setIsUpdatingPlan(true);
    setError("");
    setSuccess("");

    try {
      await updatePlan(planId);
      await refreshUser();
      setSuccess("Plano atualizado com sucesso!");
      setShowPlanModal(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar plano. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCanceling(true);
    setError("");

    try {
      await cancelSubscription();
      await refreshUser();
      setSuccess("Inscrição cancelada. Você voltou para o plano FREE.");
      setShowCancelModal(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao cancelar inscrição. Tente novamente.";
      setError(errorMessage);
      setIsCanceling(false);
    }
  };

  const isFreePlan = user?.plan?.id === "free";

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Meu Perfil</h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Gerencie suas informações pessoais e configurações da conta
        </p>
      </div>

      {/* Plano Atual e Uso */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-1">
              Seu plano atual
            </p>
            <p className="text-2xl font-bold text-primary-700">
              {user.plan?.name || "FREE"}
            </p>
          </div>
          <div className="text-right sm:text-left">
            <p className="text-sm font-medium text-neutral-700 mb-1">
              Uso neste mês
            </p>
            <p className="text-xl font-semibold text-neutral-900">
              {user.monthlyUsage || 0} de{" "}
              {user.plan?.monthlyQuota === -1
                ? "∞"
                : user.plan?.monthlyQuota || 0}{" "}
              análises
            </p>
            {user.plan?.monthlyQuota !== -1 && (
              <div className="mt-2 w-full sm:w-48 bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      ((user.monthlyUsage || 0) / (user.plan?.monthlyQuota || 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Informações do Perfil */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <User className="text-primary-600" size={24} />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 truncate">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 truncate">{user.email}</p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="w-full sm:w-auto">
              Editar Perfil
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            {/* Mensagens de erro/sucesso */}
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Formulário */}
            <div className="space-y-4">
              <Input
                label="Nome completo"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Seu nome"
              />

              <Input
                label="E-mail"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="seu@email.com"
              />

              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Alterar senha (opcional)
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Nova senha"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                    placeholder="Deixe em branco para não alterar"
                  />

                  <Input
                    label="Confirmar nova senha"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirme a nova senha"
                  />
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-neutral-200">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                  setSuccess("");
                  // Restaurar valores originais
                  setFormData({
                    name: user.name,
                    email: user.email,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                isLoading={isSaving}
                disabled={isSaving}
              >
                <Save size={18} className="mr-2" />
                Salvar alterações
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Nome completo
                </label>
                <p className="text-neutral-900 mt-1">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  E-mail
                </label>
                <p className="text-neutral-900 mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Plano
                </label>
                <p className="text-neutral-900 mt-1">
                  {user.plan?.name || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Uso mensal
                </label>
                <p className="text-neutral-900 mt-1">
                  {user.monthlyUsage || 0} / {user.plan?.monthlyQuota || 0}{" "}
                  análises
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Gerenciamento de Plano */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <CreditCard className="text-primary-600" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Gerenciar Plano
              </h3>
              <p className="text-sm text-neutral-600">
                Altere seu plano ou cancele sua assinatura
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!isFreePlan && (
            <Button
              variant="outline"
              onClick={() => setShowCancelModal(true)}
              className="border-warning-300 text-warning-600 hover:bg-warning-50"
            >
              <XCircle size={18} className="mr-2" />
              Cancelar Assinatura
            </Button>
          )}
          <Button variant="primary" onClick={() => setShowPlanModal(true)}>
            <CreditCard size={18} className="mr-2" />
            {isFreePlan ? "Fazer Upgrade" : "Alterar Plano"}
          </Button>
        </div>
      </Card>

      {/* Zona de Perigo */}
      <Card className="border-error-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="text-error-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Zona de Perigo
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Ao deletar sua conta, todos os seus dados serão permanentemente
              removidos. Esta ação não pode ser desfeita.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(true)}
              className="border-error-300 text-error-600 hover:bg-error-50"
            >
              <Trash2 size={18} className="mr-2" />
              Deletar Conta
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Confirmar exclusão de conta"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle
              className="text-error-600 flex-shrink-0 mt-0.5"
              size={24}
            />
            <div>
              <p className="text-neutral-900 font-medium mb-2">
                Tem certeza que deseja deletar sua conta?
              </p>
              <p className="text-sm text-neutral-600">
                Esta ação é permanente e não pode ser desfeita. Todos os seus
                dados, análises e histórico serão removidos permanentemente.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              isLoading={isDeleting}
              disabled={isDeleting}
              className="border-error-300 text-error-600 hover:bg-error-50"
            >
              <Trash2 size={18} className="mr-2" />
              Sim, deletar conta
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Alteração de Plano */}
      <Modal
        isOpen={showPlanModal}
        onClose={() => !isUpdatingPlan && setShowPlanModal(false)}
        title="Escolha seu plano"
        size="lg"
      >
        <div className="space-y-6">
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* FREE - Neutro */}
            {AVAILABLE_PLANS.filter((p) => p.id === "free").map((plan) => {
              const isCurrentPlan = user?.plan?.id === plan.id;
              const isDowngrade = user?.plan?.id !== "free" && plan.id === "free";

              return (
                <div
                  key={plan.id}
                  className={`border rounded-lg p-6 transition-all bg-neutral-50 ${
                    isCurrentPlan
                      ? "border-primary-300 bg-neutral-100"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-neutral-900">
                      Free
                    </h4>
                    {isCurrentPlan && (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded font-medium">
                        Plano atual
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 mb-2">
                    Grátis
                  </p>
                  <p className="text-sm text-neutral-600 mb-4">
                    {plan.monthlyQuota} análises/mês
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600 mb-4">
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-neutral-400 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Ideal para uso pessoal e testes</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-neutral-400 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Limite de {plan.monthlyQuota} análises por mês</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-neutral-400 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Histórico limitado</span>
                    </li>
                  </ul>
                  <p className="text-xs text-neutral-500 mb-4 italic">
                    Perfeito para começar a usar o ProvaReal antes de evoluir para o Pro.
                  </p>
                  {isCurrentPlan ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      Plano atual
                    </Button>
                  ) : isDowngrade ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-neutral-600"
                      onClick={() => handleUpdatePlan(plan.id)}
                      disabled={isUpdatingPlan}
                    >
                      Mudar para Free
                    </Button>
                  ) : null}
                </div>
              );
            })}

            {/* PRO - Destacado */}
            {AVAILABLE_PLANS.filter((p) => p.id === "pro").map((plan) => {
              const isCurrentPlan = user?.plan?.id === plan.id;
              const isUpgrade = user?.plan?.id !== "pro";

              return (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-6 transition-all relative ${
                    isCurrentPlan
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-primary-500 bg-white shadow-lg scale-105"
                  }`}
                >
                  {!isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-primary-900">
                      Pro
                    </h4>
                    {isCurrentPlan && (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded font-medium">
                        Plano atual
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-primary-700 mb-2">
                    R$ {plan.price.toFixed(2).replace(".", ",")}
                    <span className="text-sm font-normal text-neutral-500">
                      /mês
                    </span>
                  </p>
                  <p className="text-sm text-neutral-600 mb-4">
                    {plan.monthlyQuota} análises/mês
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-700 mb-4">
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Para criadores, jornalistas e equipes pequenas</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>{plan.monthlyQuota} análises por mês</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Detecção avançada com mais precisão</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Histórico ilimitado</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Suporte prioritário</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Acesso à API para automação</span>
                    </li>
                  </ul>
                  {isCurrentPlan ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      Plano atual
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => handleUpdatePlan(plan.id)}
                      disabled={isUpdatingPlan}
                    >
                      {isUpgrade ? "Atualizar para Pro" : "Assinar Pro"}
                    </Button>
                  )}
                </div>
              );
            })}

            {/* PREMIUM - Aspiracional */}
            {AVAILABLE_PLANS.filter((p) => p.id === "premium").map((plan) => {
              const isCurrentPlan = user?.plan?.id === plan.id;
              const isUpgrade = user?.plan?.id !== "premium";

              return (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-6 transition-all ${
                    isCurrentPlan
                      ? "border-primary-500 bg-primary-50 shadow-lg"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-neutral-900">
                      Premium
                    </h4>
                    {isCurrentPlan ? (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded font-medium">
                        Plano atual
                      </span>
                    ) : (
                      <span className="text-xs bg-neutral-600 text-white px-2 py-1 rounded font-medium">
                        Para equipes
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 mb-2">
                    R$ {plan.price.toFixed(2).replace(".", ",")}
                    <span className="text-sm font-normal text-neutral-500">
                      /mês
                    </span>
                  </p>
                  <p className="text-sm text-neutral-600 mb-4">Ilimitado</p>
                  <ul className="space-y-2 text-sm text-neutral-700 mb-4">
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Para redações, campanhas e operações críticas</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Análises ilimitadas</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Detecção em tempo real</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Relatórios detalhados para auditoria</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>Gerente de conta dedicado</span>
                    </li>
                    <li className="flex items-start">
                      <Check
                        size={16}
                        className="text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span>SLA garantido</span>
                    </li>
                  </ul>
                  {isCurrentPlan ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      Plano atual
                    </Button>
                  ) : (
                    <Button
                      variant={isUpgrade ? "primary" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={() => handleUpdatePlan(plan.id)}
                      disabled={isUpdatingPlan}
                    >
                      {isUpgrade ? "Atualizar para Premium" : "Assinar Premium"}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-neutral-200">
            <Button
              variant="ghost"
              onClick={() => setShowPlanModal(false)}
              disabled={isUpdatingPlan}
            >
              Fechar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal de Cancelamento de Assinatura */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => !isCanceling && setShowCancelModal(false)}
        title="Cancelar Assinatura"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle
              className="text-warning-600 flex-shrink-0 mt-0.5"
              size={24}
            />
            <div>
              <p className="text-neutral-900 font-medium mb-2">
                Tem certeza que deseja cancelar sua assinatura?
              </p>
              <p className="text-sm text-neutral-600">
                Ao cancelar, você voltará para o plano FREE. Você perderá acesso
                às funcionalidades do plano {user?.plan?.name} e seu limite será
                reduzido para 10 análises por mês.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowCancelModal(false)}
              disabled={isCanceling}
            >
              Manter Assinatura
            </Button>
            <Button
              variant="outline"
              onClick={handleCancelSubscription}
              isLoading={isCanceling}
              disabled={isCanceling}
              className="border-warning-300 text-warning-600 hover:bg-warning-50"
            >
              <XCircle size={18} className="mr-2" />
              Cancelar Assinatura
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
