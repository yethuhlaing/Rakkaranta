"use client";

import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

function DeleteAccountModal({
    showDeleteAccountModal,
    setShowDeleteAccountModal,
}: {
    showDeleteAccountModal: boolean;
    setShowDeleteAccountModal: Dispatch<SetStateAction<boolean>>;
}) {

    const { getUser} = useKindeBrowserClient()
    const user = getUser()
    const fullName = user?.given_name + user?.family_name

    const [deleting, setDeleting] = useState(false);
    async function deleteAccount() {
        setDeleting(true);
        setDeleting(false);

        // await fetch(`/api/user`, {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // }).then(async (res) => {
        //     if (res.status === 200) {
        //         // delay to allow for the route change to complete
        //         await new Promise((resolve) =>
        //             setTimeout(() => {
        //                 signOut({
        //                     callbackUrl: `${window.location.origin}/`,
        //                 });
        //                 resolve(null);
        //             }, 500),
        //         );
        //     } else {
        //         setDeleting(false);
        //         const error = await res.text();
        //         throw error;
        //     }
        // });
    }

    return (
        <Modal
            showModal={showDeleteAccountModal}
            setShowModal={setShowDeleteAccountModal}
            className="gap-0"
        >
            <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
                <UserAvatar
                    user={{
                        name: fullName || null,
                        image: user?.picture || null,
                    }}
                />
                <h3 className="text-lg font-semibold">Delete Account</h3>
                <p className="text-center text-sm text-muted-foreground">
                    <b>Warning:</b> This will permanently delete your account
                    and your active subscription!
                </p>

                {/* TODO: Use getUserSubscriptionPlan(session.user.id) to display the user's subscription if he have a paid plan */}
            </div>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    toast("Deleting account...",{
                        description: "Please wait while we process your request.",
                    });
            
                    try {
                        await deleteAccount();
                        toast("Success",{
                            description: "Account deleted successfully!",
                        });
                    } catch (err: any) {
                        toast("Error", {
                            description: err?.message || "Something went wrong.",
                        });
                    }
                }}
                className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
            >
                <div>
                    <label htmlFor="verification" className="block text-sm">
                        To verify, type{" "}
                        <span className="font-semibold text-black dark:text-white">
                            confirm delete account
                        </span>{" "}
                        below
                    </label>
                    <Input
                        type="text"
                        name="verification"
                        id="verification"
                        pattern="confirm delete account"
                        required
                        autoFocus={false}
                        autoComplete="off"
                        className="mt-1 w-full border bg-background"
                    />
                </div>

                <Button
                    variant={deleting ? "disable" : "destructive"}
                    disabled={deleting}
                >
                    Confirm delete account
                </Button>
            </form>
        </Modal>
    );
}

export function useDeleteAccountModal() {
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const DeleteAccountModalCallback = useCallback(() => {
        return (
            <DeleteAccountModal
                showDeleteAccountModal={showDeleteAccountModal}
                setShowDeleteAccountModal={setShowDeleteAccountModal}
            />
        );
    }, [showDeleteAccountModal, setShowDeleteAccountModal]);

    return useMemo(
        () => ({
            setShowDeleteAccountModal,
            DeleteAccountModal: DeleteAccountModalCallback,
        }),
        [setShowDeleteAccountModal, DeleteAccountModalCallback],
    );
}
