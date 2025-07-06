import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { multiDeviceSync, SyncResult } from '@/utils/multiDeviceSync';
import { getUserProfile } from '@/utils/localStorage';

interface SyncManagementProps {
  onSyncComplete?: () => void;
}

const SyncManagement: React.FC<SyncManagementProps> = ({ onSyncComplete }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const [switchUserId, setSwitchUserId] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingSwitchId, setPendingSwitchId] = useState('');
  const [isUserIdVisible, setIsUserIdVisible] = useState(false);
  const [hasAutoSynced, setHasAutoSynced] = useState(false);
  
  const userProfile = getUserProfile();
  const userId = userProfile?.userId || '';

  // Auto-sync on component mount (only if not already synced by App)
  useEffect(() => {
    const performAutoSync = async () => {
      // Check if we should skip auto-sync (App component handles global sync)
      const skipAutoSync = sessionStorage.getItem('autoSyncCompleted') === 'true';
      
      if (!userProfile || hasAutoSynced || skipAutoSync) return;
      
      setIsLoading(true);
      setHasAutoSynced(true);
      
      try {
        const result = await multiDeviceSync.syncUserData();
        setSyncResult(result);
        
        if (result.success && onSyncComplete) {
          onSyncComplete();
        }
        
        // Mark auto-sync as completed for this session
        sessionStorage.setItem('autoSyncCompleted', 'true');
      } catch (error) {
        setSyncResult({
          success: false,
          action: 'no_action',
          message: `Auto-sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      } finally {
        setIsLoading(false);
        // Hide the result after 5 seconds for auto-sync
        setTimeout(() => setSyncResult(null), 5000);
      }
    };

    performAutoSync();
  }, [userProfile, hasAutoSynced, onSyncComplete]);

  const handleSwitchUser = async () => {
    if (!switchUserId.trim()) {
      setSyncResult({
        success: false,
        action: 'no_action',
        message: 'Please enter a valid User ID'
      });
      return;
    }

    setIsLoading(true);
    setSyncResult(null);
    
    try {
      const result = await multiDeviceSync.switchToUser(switchUserId.trim());
      setSyncResult(result);
      
      if (result.success) {
        setShowSwitchDialog(false);
        setSwitchUserId('');
        if (onSyncComplete) {
          onSyncComplete();
        }
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      setSyncResult({
        success: false,
        action: 'no_action',
        message: `Switch failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSwitchUser = () => {
    setPendingSwitchId(switchUserId);
    setShowConfirmDialog(true);
  };

  const proceedWithSwitch = () => {
    setSwitchUserId(pendingSwitchId);
    setShowConfirmDialog(false);
    setShowSwitchDialog(false);
    handleSwitchUser();
  };

  const getResultIcon = (result: SyncResult) => {
    if (!result.success) return '⚠️';
    
    switch (result.action) {
      case 'uploaded':
        return '⬆️';
      case 'downloaded':
        return '⬇️';
      case 'merged':
        return '🔄';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sync Status */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🔄 {t('Multi-Device Sync')}
        </h3>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t('Your game progress automatically syncs across all your devices.')}
          </p>
          
          {/* Auto-sync status */}
          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-lg">🔄</span>
              <span className="text-sm text-blue-800">{t('Auto-syncing your data...')}</span>
            </div>
          )}
          
          {!isLoading && !syncResult && hasAutoSynced && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-lg">✅</span>
              <span className="text-sm text-green-800">{t('Data synced automatically')}</span>
            </div>
          )}
        </div>
      </div>

      {/* User ID Management */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          👥 {t('Account Management')}
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('Your User ID')}</label>
            <div className="flex gap-2">
              <input
                value={isUserIdVisible ? userId : '••••••••-••••-••••-••••-••••••••••••'}
                readOnly
                className="flex-1 font-mono text-xs p-2 border rounded bg-muted/50"
                placeholder={t('No user profile')}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsUserIdVisible(!isUserIdVisible)}
                disabled={!userId}
              >
                {isUserIdVisible ? '🙈' : '�️'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t('Click the eye button to reveal your ID, then manually copy it to access your account from other devices')}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowSwitchDialog(true)}
            className="w-full"
          >
            👥 {t('Switch Account')}
          </Button>
        </div>
      </div>

      {/* Sync Result */}
      {syncResult && (
        <div className={`p-4 rounded-lg border ${syncResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-start gap-2">
            <span className="text-lg">{getResultIcon(syncResult)}</span>
            <div className="flex-1">
              <strong className={syncResult.success ? 'text-green-800' : 'text-red-800'}>
                {syncResult.success ? t('Success') : t('Error')}
              </strong>
              <p className={`mt-1 ${syncResult.success ? 'text-green-700' : 'text-red-700'}`}>
                {syncResult.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Switch User Dialog */}
      <Dialog open={showSwitchDialog} onOpenChange={setShowSwitchDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('Switch Account')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="switchUserId" className="text-sm font-medium">
                {t('Enter User ID')}
              </label>
              <input
                id="switchUserId"
                value={switchUserId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSwitchUserId(e.target.value)}
                placeholder={t('Paste the User ID here')}
                className="font-mono text-xs w-full p-2 border rounded"
              />
            </div>
            
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <strong className="text-yellow-800">{t('Warning:')}</strong>
                  <p className="mt-1 text-yellow-700">
                    {t('This will replace your current local data with the data from the specified account. Make sure to sync your current data first if you want to keep it.')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={confirmSwitchUser}
                disabled={!switchUserId.trim() || isLoading}
                className="flex-1"
              >
                {t('Switch Account')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSwitchDialog(false);
                  setSwitchUserId('');
                }}
              >
                {t('Cancel')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('Confirm Account Switch')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                  <strong className="text-red-800">{t('Final Warning:')}</strong>
                  <p className="mt-1 text-red-700">
                    {t('Your current local progress and settings will be permanently replaced. This action cannot be undone.')}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-sm">
              {t('Switching to User ID:')} <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{pendingSwitchId}</code>
            </p>

            <div className="flex gap-2">
              <Button
                onClick={proceedWithSwitch}
                variant="destructive"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? t('Switching...') : t('Yes, Switch Account')}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                {t('Cancel')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SyncManagement;
