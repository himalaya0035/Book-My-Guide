import os


def get_pancard_upload_path(instance, filename):
    # username = instance
    path = f"{instance.user.full_name}-{instance.user.id}/verification/pancard"

    return os.path.join(
        f"{path}/{filename}"
    )

def get_acc_verif_upload_path(instance, filename):
    # username = instance
    path = f"{instance.user.full_name}-{instance.user.id}/verification/bank-verif"

    return os.path.join(
        f"{path}/{filename}"
    )


def get_adhaar_upload_path(instance, filename):
    # username = instance
    path = f"{instance.user.full_name}-{instance.user.id}/verification/adhaar"

    return os.path.join(
        f"{path}/{filename}"
    )

def get_place_image_path(instance, filename):
    loc = instance.location
    path = f"places/{loc.state}/{loc.city}/{instance.place_name}/{filename}"
    return os.path.join(path)

#TODO license image upload path