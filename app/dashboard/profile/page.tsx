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
    } catch (err: any) {
      setError(err?.message || "Erro ao atualizar perfil. Tente novamente.");
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
    } catch (err: any) {
      setError(err?.message || "Erro ao deletar conta. Tente novamente.");
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
    } catch (err: any) {
      setError(err?.message || "Erro ao atualizar plano. Tente novamente.");
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
    } catch (err: any) {
      setError(err?.message || "Erro ao cancelar inscrição. Tente novamente.");
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
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Meu Perfil</h1>
        <p className="text-neutral-600">
          Gerencie suas informações pessoais e configurações da conta
        </p>
      </div>

      {/* Informações do Perfil */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="text-primary-600" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {user.name}
              </h2>
              <p className="text-sm text-neutral-600">{user.email}</p>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
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
                Plano e Assinatura
              </h3>
              <p className="text-sm text-neutral-600">
                Gerencie seu plano atual e altere ou cancele sua assinatura
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Plano Atual */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Plano Atual
                </p>
                <p className="text-2xl font-bold text-primary-700 mt-1">
                  {user.plan?.name || "FREE"}
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  {user.plan?.monthlyQuota === -1
                    ? "Análises ilimitadas"
                    : `${user.plan?.monthlyQuota || 0} análises/mês`}
                </p>
              </div>
              {user.plan?.id !== "free" && (
                <div className="text-right">
                  <p className="text-sm text-neutral-600">Uso mensal</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {user.monthlyUsage || 0} /{" "}
                    {user.plan?.monthlyQuota === -1
                      ? "∞"
                      : user.plan?.monthlyQuota || 0}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ações */}
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
            <Button variant="outline" onClick={() => setShowPlanModal(true)}>
              <CreditCard size={18} className="mr-2" />
              {isFreePlan ? "Fazer Upgrade" : "Alterar Plano"}
            </Button>
          </div>
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
        title="Alterar Plano"
        size="lg"
      >
        <div className="space-y-4">
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

          <p className="text-sm text-neutral-600 mb-4">
            Escolha um plano para alterar sua assinatura:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AVAILABLE_PLANS.map((plan) => {
              const isCurrentPlan = user?.plan?.id === plan.id;
              const isUnlimited = plan.monthlyQuota === -1;

              return (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    isCurrentPlan
                      ? "border-primary-500 bg-primary-50"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">
                      {plan.name}
                    </h4>
                    {isCurrentPlan && (
                      <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded">
                        Atual
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {plan.price === 0
                      ? "Grátis"
                      : `R$ ${plan.price.toFixed(2)}`}
                    {plan.price > 0 && (
                      <span className="text-sm font-normal text-neutral-500">
                        /mês
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-neutral-600 mb-3">
                    {isUnlimited
                      ? "Ilimitado"
                      : `${plan.monthlyQuota} análises/mês`}
                  </p>
                  <ul className="space-y-1 text-xs text-neutral-600">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          size={14}
                          className="text-primary-600 mr-1 flex-shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {!isCurrentPlan && (
                    <Button
                      variant={plan.id === "free" ? "outline" : "primary"}
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => handleUpdatePlan(plan.id)}
                      disabled={isUpdatingPlan}
                    >
                      {plan.id === "free"
                        ? "Voltar para FREE"
                        : "Escolher Plano"}
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
