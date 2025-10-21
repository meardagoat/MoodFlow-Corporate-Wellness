# Système de Rôles Hiérarchique - MoodFlow

## 🎯 Vue d'ensemble

Le système de rôles hiérarchique de MoodFlow implémente une structure d'entreprise à 3 niveaux, permettant un contrôle granulaire de la création de comptes et des permissions.

## 📊 Hiérarchie des Rôles

```
Super Admin (system_admin)
    ↓ peut créer
    Manager (manager)
        ↓ peut créer  
        Employee (employee)
```

### 🔐 Super Admin (system_admin)
- **Peut créer** : Tous les types d'utilisateurs (system_admin, manager, employee)
- **Accès** : Panneau d'administration complet
- **Responsabilités** : Gestion globale de l'organisation

### 👔 Manager (manager)
- **Peut créer** : Employés uniquement
- **Accès** : Interface standard + gestion d'équipe
- **Responsabilités** : Gestion de son équipe

### 👤 Employee (employee)
- **Peut créer** : Personne
- **Accès** : Interface standard
- **Responsabilités** : Utilisation de l'application

## 🚀 Installation et Configuration

### 1. Appliquer les Migrations

```bash
# Appliquer la migration pour ajouter le rôle system_admin
supabase db push
```

### 2. Créer le Premier Super Admin

1. **Créer un compte utilisateur normal** via l'interface d'inscription
2. **Exécuter le script SQL** pour promouvoir l'utilisateur :

```sql
-- Remplacer 'admin@company.com' par l'email de l'utilisateur
SELECT create_first_system_admin('admin@company.com');
```

### 3. Déployer l'Edge Function

```bash
# Déployer la fonction create-user
supabase functions deploy create-user
```

## 🔧 Utilisation

### Inscription Publique
- **Limitation**** : Seuls les employés peuvent s'inscrire
- **Interface** : L'interface d'inscription publique ne permet que le rôle "employee"
- **Sécurité** : Les rôles manager et system_admin ne sont pas disponibles publiquement

### Création d'Utilisateurs par les Administrateurs

#### Pour les Super Admins
- Accès au panneau d'administration (`/admin`)
- Peuvent créer tous types d'utilisateurs
- Interface complète de gestion des utilisateurs

#### Pour les Managers
- Peuvent créer des employés via l'API
- Utilisation de la fonction `createUser()` avec vérification des permissions

### API de Création d'Utilisateurs

```typescript
// Exemple d'utilisation
import { createUser } from '../lib/auth';

// Créer un employé (manager ou system_admin)
const { data, error } = await createUser(
  'nouvel.employe@company.com',
  'motdepasse123',
  'employee',
  'Ingénierie'
);
```

## 🛡️ Sécurité

### Contrôles Implémentés

1. **Vérification des Permissions**
   - Fonction `canCreateRole()` pour valider les permissions
   - Vérification côté client ET serveur

2. **Edge Function Sécurisée**
   - Vérification JWT de l'appelant
   - Validation des permissions côté serveur
   - Utilisation du service role key pour la création

3. **Policies RLS**
   - Seuls les system_admin peuvent modifier les rôles
   - Contrôle d'accès au panneau d'administration
   - Protection des données sensibles

### Règles de Sécurité

- ✅ **Jamais de confiance côté client** pour les opérations sensibles
- ✅ **Double vérification** des permissions (client + serveur)
- ✅ **Edge Functions** pour les opérations administratives
- ✅ **RLS Policies** pour la protection des données

## 📁 Fichiers Modifiés/Créés

### Types et Configuration
- `src/lib/database.types.ts` - Ajout du type `system_admin`
- `src/lib/auth.ts` - Nouvelles fonctions de contrôle d'accès

### Migrations
- `supabase/migrations/20250116120000_add_system_admin_role.sql` - Migration principale
- `supabase/scripts/create_first_admin.sql` - Script de création du premier admin

### Edge Functions
- `supabase/functions/create-user/index.ts` - Création sécurisée d'utilisateurs

### Interface Utilisateur
- `src/views/RegisterView.vue` - Inscription limitée aux employés
- `src/views/ProfileView.vue` - Gestion des rôles pour les admins
- `src/views/AdminPanel.vue` - Panneau d'administration
- `src/router/index.ts` - Route protégée pour l'admin

## 🔄 Workflow Typique

### 1. Configuration Initiale
1. Déployer les migrations
2. Créer un compte utilisateur normal
3. Exécuter le script pour promouvoir en system_admin
4. Déployer l'Edge Function

### 2. Gestion des Utilisateurs
1. **Super Admin** accède au panneau d'administration
2. Crée des **Managers** pour chaque département
3. Les **Managers** créent leurs **Employés**
4. Les **Employés** utilisent l'application normalement

### 3. Maintenance
- Les Super Admins peuvent modifier les rôles
- Les Managers peuvent gérer leur équipe
- Audit des permissions via les logs

## 🚨 Points d'Attention

### Sécurité
- **Ne jamais** exposer les clés de service côté client
- **Toujours** vérifier les permissions côté serveur
- **Utiliser** les Edge Functions pour les opérations sensibles

### Performance
- Les vérifications de permissions sont optimisées
- Cache des profils utilisateur
- Requêtes RLS optimisées

### Maintenance
- Surveiller les logs d'audit
- Vérifier régulièrement les permissions
- Mettre à jour les policies RLS si nécessaire

## 📞 Support

Pour toute question sur le système de rôles :
- Consultez les logs Supabase
- Vérifiez les policies RLS
- Testez les Edge Functions
- Contactez l'équipe de développement

---

**Note** : Ce système reflète une structure d'entreprise classique et respecte les bonnes pratiques de sécurité pour les applications d'entreprise.
